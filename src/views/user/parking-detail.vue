<template>
  <div id="parkingDetail">
    <van-cell-group>
      <van-cell title="车牌号" :value="parking.carNum" icon="logistics" />
      <van-cell title="停车时间" :value="parking.date" icon="clock-o" />
      <van-cell
        title="停车区域"
        :value="parking.parkingNum"
        icon="location-o"
      />
      <van-cell
        title="停车价格"
        :value="'￥' + parking.price"
        icon="gold-coin-o"
      />
    </van-cell-group>
    <div class="qrCode">
      <div class="qrCodeTip">请出示此二维码给检票员</div>
      <vue-qr
        class="qrCodeImg"
        :logoScale="20"
        :text="JSON.stringify(parking)"
        :margin="0"
        :dotScale="1"
      ></vue-qr>
    </div>
  </div>
</template>
<script>
import vueQr from 'vue-qr'
export default {
  components: {
    vueQr
  },
  name: 'parkingDetail',
  data () {
    return {
      parking: {}
    }
  },

  methods: {

  },
  mounted () {
    this.parking = {
      carNum: this.$route.query.carNum,
      date: this.$route.query.parkingStartTime + '~' + this.$route.query.parkingEndTime,
      parkingNum: this.$route.query.area + '区' + this.$route.query.num,
      price: this.$route.query.price
    }
  }
}
</script>

<style lang="scss" scope>
.van-cell {
  padding: px2rem(20px);
  font-size: px2rem(30px);
  line-height: px2rem(45px);

  &__left-icon {
    font-size: px2rem(40px);
  }

  &__title {
    margin: 0 px2rem(-50px) 0 0;
    width: px2rem(250px);
  }

  &__label {
    font-size: px2rem(30px);
    line-height: px2rem(45px);
  }
}

.qrCode {
  margin: px2rem(50px) px2rem(150px);

  .qrCodeTip {
  }

  .qrCodeImg {
    height: px2rem(400px);
    width: px2rem(400px);
    margin-top: px2rem(40px);
    border: 1px solid green;
  }
}
</style>
