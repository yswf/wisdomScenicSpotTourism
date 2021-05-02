<template>
  <div id="home">
    <van-swipe :autoplay="3000" :loop="true" class="swipe">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="swipe-img" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="3" class="grid">
      <van-grid-item
        v-for="(grid, index) in grids"
        :key="index"
        :to="grid.to"
        class="grid-item"
      >
        <span :class="['icon', 'iconfont', grid.icon]"></span>
        <span class="grid-text">{{ grid.text }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import {
  Icon,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Lazyload
} from 'vant'
export default {
  name: 'home',
  data () {
    return {
      images: [
        'https://yswf.xyz/usr/uploads/2020/05/1924359554.png',
        'https://yswf.xyz/usr/uploads/2020/05/2863237582.png',
        'https://yswf.xyz/usr/uploads/2020/05/3944198772.png'
      ],
      grids: [{
        icon: 'icon-jingqu',
        text: '景区介绍',
        to: '/scenicSpotIntroduction'
      },
      {
        icon: 'icon-fabu',
        text: '活动资讯',
        to: '/activityInformation'
      },
      {
        icon: 'icon-daolan',
        text: '电子地图',
        to: '/electronicMap'
      },
      {
        icon: 'icon-daoyoufuwu',
        text: '电子导游',
        to: '/electronicNavigation'
      },
      {
        icon: 'icon-keliuqushi',
        text: '数据感知',
        to: '/scenicSpotTraffic'
      },
      {
        icon: 'icon-tingchechang',
        text: '预约停车',
        to: '/stopAppointment'
      }
      ]

    }
  },
  computed: {
    isShowHead () {
      return !this.isWechat
    }
  },
  watch: {},
  components: {

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
    }
  },
  created () {
    this.checkEnv()
  }
}
</script>

<style lang="scss" scope>
.swipe {
  width: 100%;
  height: px2rem(380px) !important;

  .swipe-img {
    height: px2rem(380px);
    width: 100%;
  }
}

.grid {
  width: 100%;
  height: px2rem(380px);

  .iconfont {
    height: px2rem(50px);
    width: px2rem(50px);
    font-size: px2rem(50px);
    margin: px2rem(20px) 0;
    color: #3d11ee;
  }

  .grid-text {
    font-size: px2rem(28px);
  }
}
</style>
