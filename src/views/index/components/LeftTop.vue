<template>
  <div class="IndexLeftTop">

    <div v-for="(v,i) in list" :key="i" class="div">
      <img :src="v.img" alt="">
      <div>
        <p><span :style="{color:v.color,fontSize:'18px'}">{{ v.cont }}</span>吨</p>
        <p>{{ v.name }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'RightTop',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    arr: {
      type: Object
    }
  },
  data() {
    return {
      list: [
        {
          cont: '0',
          color: '#54f0ff',
          img: require('../../../../static/index/图层4.png'),
          name: '当日生产量'
        },
        {
          cont: '0',
          color: '#e4a746',
          img: require('../../../../static/index/图层3.png'),
          name: '当月生产量'
        }, {
          cont: '0',
          color: '#ff4866',
          img: require('../../../../static/index/图层6.png'),
          name: '当年生产量'
        }
      ]
    }
  },
  watch: {
    'arr'() {
      this.list[0].cont = this.arr.dayShipmentTotal ? this.arr.dayShipmentTotal : 0// 当日生产量
      this.list[1].cont = this.arr.monthShipmentTotal ? this.arr.monthShipmentTotal : 0 // 当月生产量
      this.list[2].cont = this.arr.yearShipmentTotal ? this.arr.yearShipmentTotal : 0 // 当年生产量
    }
  }
}
</script>

<style lang="scss" scoped>
.IndexLeftTop {
  // width: 596px;
  height: 105px;
  margin: 14px 0 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  .div {
    width: 184px;
    height: 79px;
    padding:0 6px;
    text-align: left;
    border-right: 1px solid #16578d;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    img {
      width: 57px;
      height: 57px;
    }
    div {
      width: 150px;
      p {
        width: 100%;
        height: 38px;
        display: block;
        padding: 0;
        margin: 0;
        text-align: center;
        font-family: DINPro-Medium;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        line-height: 58px;
        letter-spacing: 1px;
        color: #fff;
      }
    }
  }

  div:nth-child(3) {
    border-right: 0;
  }
}
</style>
