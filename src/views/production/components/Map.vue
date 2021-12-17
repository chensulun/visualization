<template>
  <baidu-map
    class="bm-view"
    ak="CKozdeH8v9XoTyaFB5slrpMMwzzIvvs0"
    :center="center"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    :map-click="false"
    @mousemove="syncPolyline"
    @click="paintPolyline"
    @rightclick="newPolyline"
    @ready="handler"
  >

    <bm-polyline
      v-for="(path,i) of list"
      :key="i"
      :icons="icons"
      stroke-color="#0091ea"
      :stroke-opacity="0.8"
      :stroke-weight="10"
      :path="path"
    />
  </baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmPolyline from './BmPolyline.vue'
export default {
  name: 'Map',
  components: {
    BaiduMap,
    BmPolyline
  },
  data() {
    return {
      center: { lng: 120.846005, lat: 31.618034 },
      zoom: 16,
      LastClick: { 'lng': '', 'lat': '' },
      icons: [], // 线路图标
      list: [], // 绘制的线路
      polyline: {
        editing: false,
        paths: [
          [{ 'lng': 120.834938, 'lat': 31.609931, 'name': '川A9999' }, { 'lng': 120.835189, 'lat': 31.62011 }, { 'lng': 120.841909, 'lat': 31.620233 }, { 'lng': 120.841765, 'lat': 31.623277 }, { 'lng': 120.846005, 'lat': 31.622969 }, { 'lng': 120.847155, 'lat': 31.624537, 'name': '川A9999' }],
          [{ 'lng': 120.845789, 'lat': 31.610746, 'name': '川A6666' }, { 'lng': 120.850101, 'lat': 31.60847 }, { 'lng': 120.842843, 'lat': 31.602996 }, { 'lng': 120.834579, 'lat': 31.602689 }, { 'lng': 120.831991, 'lat': 31.606994 }, { 'lng': 120.827967, 'lat': 31.60478 }, { 'lng': 120.828542, 'lat': 31.599182, 'name': '川A66666' }]
        ]
      }
    }
  },
  methods: {
    // 地图初始化
    handler({ BMap, map }) {
      this.zoom = 15
      // 绘制全部点位

      // 初始绘制最新的点位数据
      const paths = this.polyline.paths
      let name // 存储当前车牌号的值
      for (var i = 0; i < paths.length; i++) {
        for (let x = 0; x < paths[i].length; x++) {
          var marker = new BMap.Marker(new BMap.Point(paths[i][x]['lng'], paths[i][x]['lat']))// 标创建注点
          // 只绘制最后一个坐标最新位置
          if (x === paths[i].length - 1) {
            name = paths[i][x]['name']
            marker.setLabel(new BMap.Label(`车牌号:${name}终点`, { offset: new BMap.Size(15, -25) }))// 备注；如果不想要就删掉
            this.addClickHandler(`车牌号:${name}`, marker, map, BMap)// 调用点击方法
            map.addOverlay(marker)// 在地图的指定坐标添加覆盖物 也就是标注点
          }
        }
      }
    },
    // 点击坐标位置的时候触发
    addClickHandler(content, marker, map, BMap) {
      marker.addEventListener('click', (e) => {
        const p = e.target
        console.log('点击的位置')
        // 得到当前位置坐标 在数组反查
        const LastClick = JSON.parse(JSON.stringify(this.LastClick))
        // 点击之后重新绘制
        const paths = this.polyline.paths
        for (var i = 0; i < paths.length; i++) {
          for (let x = 0; x < paths[i].length; x++) {
            if (LastClick.lng !== '' && LastClick.lat !== '') {
              // 上次位置不等于空时 删除上一次到起始位置 找到上次位置到起始点
              if (paths[i][x]['lng'] === LastClick.lng && paths[i][x]['lat'] === LastClick.lat) {
                const Last = JSON.parse(JSON.stringify(paths[i][0]))
                // 循环所有的点 找到所在到坐标删除
                var allOverlay = map.getOverlays()
                for (var s = 0; s < allOverlay.length; s++) {
                  // 删除指定经度的点
                  if (allOverlay[s].point.lng === Last.lng && allOverlay[s].point.lat === Last.lat) {
                    map.removeOverlay(allOverlay[s])
                    break
                  }
                }
              }
            }
            // 找到当前选择到位置
            if (paths[i][x]['lng'] === p.point.lng && paths[i][x]['lat'] === p.point.lat) {
              this.list = [paths[i]] // 得到绘制到线路
              let name
              for (let x = 0; x < paths[i].length; x++) {
                var marker = new BMap.Marker(new BMap.Point(paths[i][x]['lng'], paths[i][x]['lat']))// 标创建注点
                // Point(x,y)是封装好的一个方法，用来把坐标转换一下，以后如果用到有关坐标的功能都要用到这个方法；x是经度，y是维度
                if (x === 0) {
                  name = paths[i][x]['name']
                  marker.setLabel(new BMap.Label(`车牌号:${name}起点`, { offset: new BMap.Size(15, -25) }))// 备注；如果不想要就删掉
                  map.addOverlay(marker)// 在地图的指定坐标添加覆盖物 也就是标注点
                }
              }

              // 绘制箭头
              var sy = new BMap.Symbol(window.BMap_Symbol_SHAPE_FORWARD_OPEN_ARROW, {
                scale: 0.5, // 图标缩放大小
                strokeColor: '#fff', // 设置矢量图标的线填充颜色
                strokeWeight: '3' // 设置线宽
              })
              var icons = new BMap.IconSequence(sy, '5%', '15%')
              this.icons.push(icons)
            }
          }
        }
        // 绘制完把当前点击到位置存储起来
        this.LastClick = { 'lng': p.point.lng, 'lat': p.point.lat }
      })
    },
    // 模拟测试操作函数
    syncPolyline(e) {
      if (!this.polyline.editing) {
        return
      }
      const { paths } = this.polyline
      if (!paths.length) {
        return
      }
      const path = paths[paths.length - 1]
      if (!path.length) {
        return
      }
      if (path.length === 1) {
        path.push(e.point)
      }
      this.$set(path, path.length - 1, e.point)
    },
    newPolyline(e) {
      if (!this.polyline.editing) {
        return
      }
      const { paths } = this.polyline
      if (!paths.length) {
        paths.push([])
      }
      const path = paths[paths.length - 1]
      path.pop()
      if (path.length) {
        paths.push([])
      }
    },
    paintPolyline(e) {
      if (!this.polyline.editing) {
        return
      }
      const { paths } = this.polyline
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    }
  }

}
</script>

<style lang="scss" scoped>
/* 地图容器必须设置宽和高属性 */
.bm-view{
  width: 614px;
  height: 821px;
  color: #fff;
}

</style>
