<template>
  <div class="letBut">
    <el-radio-group v-model="type" class="letBut-but" @change="changeType">
      <el-radio-button label="日" value="1" />
      <el-radio-button label="月" value="2" />
      <el-radio-button label="年" value="3" />
    </el-radio-group>
    <Echartstb class="ech" :data="data" name="电能（电加热沥青）" />
  </div>
</template>

<script>
// 电能（电加热沥青）
import Echartstb from './Echartstb.vue'// 左边底部图表
import { getEnergyList } from '@/api/api'
export default {
  name: 'LetBut',
  components: {
    Echartstb
  },
  data() {
    return {
      type: '月',
      getDate: {
        type: '1', // 1-电能（电加热沥青），2-天然气，3-电能（生产），4-水能
        phase: '2' // 1-日，2-月，3-年
      },
      data: {
        data: [], // 数据
        time: [] // 时间
      }
    }
  },
  created() {
    this.init()
    setInterval(() => {
      this.init()
    }, 180000)
  },
  methods: {
    init() {
      getEnergyList(this.getDate).then(res => {
        this.data = res.obj
      })
    },
    changeType(e) {
      if (e === '日') this.getDate.phase = '1'
      if (e === '月') this.getDate.phase = '2'
      if (e === '年') this.getDate.phase = '3'
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
.letBut{
  width: 100%;
  height: 100%;
  position: relative;
  &-but{
    // border: 1px solid red;
    position: absolute;
    top: 0;
    right: 50px;
    z-index: 6;
   display: flex;
  }
  .echa{
  width: 100%;
  height: 340px;
  display: flex;
  .ech{
    width: 33.3%;
  }
  }
}
</style>
