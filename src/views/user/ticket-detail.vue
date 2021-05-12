<template>
  <div id="ticketDetail">
    <van-cell-group>
      <van-cell title="门票名称" :value="item.idName" icon="coupon-o" />
      <van-cell title="门票日期" :value="item.selectPlayDate" icon="notes-o" />
      <van-cell
        title="门票价格"
        :value="'￥' + item.ticketPay"
        icon="balance-o"
      />
      <van-cell title="门票数量" :value="item.number + '张'" icon="paid" />
      <van-cell
        title="门票类型"
        :value="item.title || '默认'"
        icon="browsing-history-o"
      />
      <van-cell title="门票详情" :label="item.descs" icon="comment-o" />
    </van-cell-group>
    <div class="qrCode">
      <div class="qrCodeTip">请出示此二维码给检票员</div>
      <!-- <img class="qrCodeImg" /> -->
      <vue-qr
        class="qrCodeImg"
        :logoScale="20"
        :text="JSON.stringify(item)"
        :margin="0"
        :dotScale="1"
      ></vue-qr>
    </div>
  </div>
</template>
<script>
import vueQr from 'vue-qr'
export default {
  name: 'ticketDetail',
  components: {
    vueQr
  },
  data () {
    return {
      item: {}
    }
  },
  filters: {
    ticketTypeFilter (type) {
      const ticketTypeJson = {
        0: '普通票',
        1: '儿童票',
        2: '学生票',
        3: '老人票',
        4: '残疾票'
      }
      return ticketTypeJson[type] || '无'
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  },
  mounted () {
    this.item = this.$route.query
    console.log(this.item)
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
    margin: 0 px2rem(-150px) 0 0;
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
