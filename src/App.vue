<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// 兼容隐藏滚动条
*::-webkit-scrollbar-track { background-color: rgba(0,0,0,0.2);  }
*::-webkit-scrollbar {  width: 0px;height:8px;  background-color: #F5F5F5;border-radius: 5px; }
*::-webkit-scrollbar-thumb { /* */background: #0C4EA2;border-radius: 5px; }
*::-webkit-scrollbar-corner{ background-color: #F5F5F5;}
*{scrollbar-width: none;} // 隐藏火狐滚动条
#app{
  height: 100%;
  width: 100%;
}
</style>
