<template>
  <div :class="{ 'has-logo': showLogo }">
    <div class="logotop">
      <span class="title">熙恒路材数智平台</span>
      <!-- <span class="title">黑鹿道路工业互联网平台</span> -->
      <!-- 左边名称和时间 -->
      <div class="logotopLeft">
        <p>
          <span>{{ LocaleDate }}</span><span>{{ time }}</span>
        </p>
        <div><img height="20px" style="margin-top:8px" src="../../../../static/index/logo.png" /></div>
        <!-- <div>黑鹿道路工业互联网平台</div> -->
      </div>
      <!-- 右边天气-->
      <div class="logotopRigth">
        <p>
          <span>{{ tianqi.high }}</span>
          <span> {{ tianqi.type }}</span>
          <span>{{ tianqi.fengxiang }}</span>
        </p>
      </div>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { getitme } from "@/utils/index";
import { tianqi } from "@/api/api";
export default {
  components: { SidebarItem },
  data() {
    return {
      time: "",
      LocaleDate: "",
      tianqi: {},
    };
  },
  created() {
    this.gettianqi();
    setInterval(() => {
      const data = getitme();
      this.LocaleDate = data[0];
      this.time = data[1];
    }, 1000);
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    gettianqi() {
      tianqi().then((res) => {
        console.log("获取到天气");
        const data = JSON.parse(res.obj).data;

        this.tianqi = data.forecast[0];
        console.log(this.tianqi);
      });
    },
  },
};
</script>

<style lang="scss" >
// 顶部logo区域样式
.logotop {
  min-width: 100%;
  width: 100%;
  height: 85px;
  background: url("../../../../static/index/toplogo1.png") no-repeat !important;
  background-size: 100% 100%;
  background-attachment: fixed;
  position: relative;
  .title {
    position: absolute;
    display: inline-block;
    width: 600px;
    top: 16px;
    // left: 678px;
    left: 736px;
    align-items: center;
    font-size: 40px;
    color: white;
  }
  .logotopLeft {
    margin-top: 0px;
    padding-left: 20px;
    width: 260px;
    color: #edf0f4;
    float: left;
    p {
      padding: 0;
      margin: 0;
      span:nth-child(1) {
        // color: #007dc9;
        color: #eee;
        font-size: 14px;
        margin-right: 5px;
      }
      span:nth-child(2) {
        // color: #4a9ef2;
        color: #fff;
        font-size: 36px;
      }
    }
    div {
      height: 20px;
      padding-left: 10px;
      margin-top: -5px;
      font-size: 16px;
      color: #edf0f4;
    }
  }
  .logotopRigth {
    margin-top: 0px;
    padding-left: 20px;
    width: 260px;
    height: 65px;
    background: red;
    color: #edf0f4;
    float: right;
    p {
      padding: 0;
      margin: 0;
      span:nth-child(1) {
        // color: #007dc9;
        color: #eee;
        font-size: 26px;
      }
      span:nth-child(2) {
        // color: #007dc9;
        color: #fff;
        font-size: 36px;
        margin-right: 5px;
      }
      span:nth-child(3) {
        // color: #007dc9;
        color: #eee;
        font-size: 14px;
      }
    }
  }
}
</style>
