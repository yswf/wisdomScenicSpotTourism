<template>
  <div id="app">
    <van-nav-bar
      :title="title"
      :left-arrow="isShowBack ? true : false"
      fixed
      right-text="···"
      v-if="!isWechat"
      @click-left="goBack"
    >
      <van-icon name="weapp-nav" slot="right" />
    </van-nav-bar>
    <div :class="['main', isShowHead ? 'main-showhead' : '']">
      <router-view></router-view>
    </div>
    <van-tabbar
      v-model="active"
      active-color="#3D11EE"
      inactive-color="#717171"
      route
      v-if="isShowTab"
    >
      <van-tabbar-item icon="browsing-history" to="/home"
        >玩转景区</van-tabbar-item
      >
      <van-tabbar-item icon="shop-collect" to="/ticketReservation"
        >购票入口</van-tabbar-item
      >
      <van-tabbar-item icon="manager" to="/userCenter"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isWechat: false, // 控制顶部导航栏和固定定位元素
      title: '红枫湖掌上导游', // 顶部导航栏标题
      active: 0, // 底部导航栏默认状态
      isShowTab: false, // 是否展示底部标签栏
      isShowBack: false // 是否展示顶部返回按钮
    }
  },
  computed: {
    isShowHead () {
      return !this.isWechat
    }
  },
  watch: {
    // 监听路由变化
    $route (to, from) {
      this.title = to.meta.title || '红枫湖掌上导游'
      if (to.meta.level === 1) { // 第一层
        this.isShowTab = true
        this.isShowBack = false
      } else {
        this.isShowTab = false
        this.isShowBack = true
      }
    }
  },
  methods: {
    // 检查运行环境
    checkEnv () {
      const ua = navigator.userAgent.toLowerCase()
      if (String(ua.match(/MicroMessenger/i)) === 'micromessenger') {
        this.isWechat = true
      } else {
        this.isWechat = false
      }
      this.$store.commit('setIsWechat', this.isWechat || '')
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.checkEnv()
  }
}
</script>

<style lang="scss" scope>
#app {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  font-size: px2rem(32px);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main {
  position: relative;
  box-sizing: border-box;
  overflow: auto;
}

.main-showhead {
  margin-top: px2rem(88px);
}

.van-nav-bar {
  height: px2rem(88px);
  color: #3d11ee;
  border-bottom: px2rem(1px) solid #ccc;
  line-height: px2rem(88px);
  font-size: px2rem(34px);
  z-index: 100;
  margin-top:px2rem(-5px) &__title {
    color: #3d11ee;
    line-height: px2rem(88px);
    font-size: px2rem(32px);
    font-weight: 600;
  }

  .van-icon {
    color: #3d11ee;
    font-size: px2rem(32px);
    line-height: px2rem(100px);
  }
}

.van-tabbar {
  height: px2rem(100px);
  border-top: px2rem(1px) solid #ccc;

  .van-tabbar-item {
    font-size: px2rem(24px);
    line-height: px2rem(24px);
  }

  .van-icon {
    font-size: px2rem(40px);
    line-height: px2rem(30px);
    margin: px2rem(5px) 0;
  }
}
</style>
