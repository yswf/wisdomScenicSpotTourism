<template>
  <div id="stopAppointment" class="contain">
    <div class="image"></div>
    <van-cell-group>
      <van-field
        v-model="carNum"
        clearable
        label="车牌号"
        placeholder="请输入车牌号"
      />
      <van-cell is-link @click="showPopup('date')"
        >停车日期<span class="parking-time" id="parking-date">{{
          parkingDate
        }}</span></van-cell
      >
      <van-cell is-link @click="showPopup('startTime')"
        >停车开始时间<span class="parking-time" id="parking-time">{{
          parkingStartTime
        }}</span></van-cell
      >
      <van-cell is-link @click="showPopup('endTime')"
        >停车结束时间<span class="parking-time" id="parking-time">{{
          parkingEndTime
        }}</span></van-cell
      >
      <van-cell is-link @click="showPopup('area')"
        >停车区域<span class="parking-time" id="parking-time">{{
          area
        }}</span></van-cell
      >
    </van-cell-group>

    <van-popup v-model="showSelectPopup" position="bottom">
      <van-datetime-picker
        class="datetime-picker"
        @confirm="confirmSelect"
        @cancel="cancelSelect"
        @change="getValues"
        v-model="currentDate"
        :title="title"
        :type="type"
        :min-date="minDate"
        :max-date="maxDate"
        :max-hour="maxHour"
        :min-hour="minHour"
      />
    </van-popup>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <div class="appoint-button" @click="appoint">确认预约</div>
  </div>
</template>
<script>
import {
  Toast
} from 'vant'
import {
  isNoValue
} from '@/utils/verify'
import {
  parking
} from '@/utils/apply.url'
export default {
  name: 'stopAppointment',
  data () {
    return {
      carNum: '',
      parkingDate: '',
      parkingStartTime: '',
      parkingEndTime: '',
      startTime: 0,
      currentSelectDate: '',
      showSelectPopup: false,
      title: '请选择停车日期',
      type: 'date', // type:date/time
      minDate: new Date(),
      maxHour: 21,
      minHour: 7,
      currentDate: new Date(),
      area: '',
      showPicker: false,
      columns: ['A', 'B', 'C', 'D']
    }
  },
  computed: {
    // 预约最大的日期（可提前七天预约）
    maxDate () {
      var currentDate = new Date().valueOf()
      var maxDate = currentDate + 7 * 24 * 60 * 60 * 1000
      maxDate = new Date(maxDate)
      return maxDate
    }
  },
  methods: {
    // 弹出选择器
    showPopup (value) {
      if (value == 'date') {
        this.title = '请选择停车日期'
        this.type = 'date'
        this.startTime = 1
      } else if (value == 'startTime') {
        this.startTime = 2
        this.title = '请选择停车时间'
        this.type = 'time'
      } else if (value == 'endTime') {
        this.startTime = 3
        this.title = '请选择结束时间'
        this.type = 'time'
      } else {
        this.showPicker = true
        return
      }
      this.showSelectPopup = true
    },
    // 确定选择
    confirmSelect () {
      var d = new Date()
      var year = d.getFullYear()
      var month = d.getMonth() + 1
      var day = d.getDate()
      var today = year + '-' + month + '-' + day
      this.showSelectPopup = false
      if (this.startTime == 1) {
        this.parkingDate = this.currentSelectDate == '' ? today : this.currentSelectDate
      } else if (this.startTime == 2) {
        this.parkingStartTime = this.currentSelectDate == '' ? '7:00' : this.currentSelectDate
      } else {
        this.parkingEndTime = this.currentSelectDate == '' ? '7:00' : this.currentSelectDate
      }
    },
    // 确认区域
    onConfirm (value) {
      this.area = value
      this.showPicker = false
    },
    // 取消选择
    cancelSelect () {
      this.showSelectPopup = false
    },
    // 获取选择数据
    getValues (value) {
      if (value.children.length == 3) { // 日期
        var year = value.children[0].options[value.children[0].currentIndex]
        var month = value.children[1].options[value.children[1].currentIndex]
        var date = value.children[2].options[value.children[2].currentIndex]
        this.currentSelectDate = year + '-' + month + '-' + date
      } else { // 时间
        var hour = value.children[0].options[value.children[0].currentIndex]
        var minute = value.children[1].options[value.children[1].currentIndex]
        this.currentSelectDate = hour + ':' + minute
      }
    },
    // 点击确认预约按钮
    appoint () {
      if (isNoValue(this.carNum)) {
        Toast('车牌号不能为空')
        return
      }
      if (isNoValue(this.parkingDate)) {
        Toast('停车日期不能为空')
        return
      }
      if (isNoValue(this.parkingStartTime)) {
        Toast('停车开始时间不能为空')
        return
      }
      if (isNoValue(this.parkingEndTime)) {
        Toast('停车结束时间不能为空')
        return
      }
      if (isNoValue(this.area)) {
        Toast('停车结束区域不能为空')
        return
      }
      var params = {
        carNum: this.carNum,
        parkingStartTime: this.parkingDate + ' ' + this.parkingStartTime,
        parkingEndTime: this.parkingDate + ' ' + this.parkingEndTime,
        area: this.columns.indexOf(this.area) + 1,
        uTel: sessionStorage.getItem('userTel')
      }
      parking(params, 'post').then(res => {
        if (res.code == '200') { // 预约成功
          Toast('预约成功，可前往个人中心查看停车信息')
          this.$router.push({
            path: '/userCenter'
          })
        } else { // 该车对应时间段已预约
          Toast('该车对应时间段已预约')
        }
      }).catch(err => {
        Toast('登录失败' || res.msg)
      })
    }

  }
}
</script>

<style lang="scss" scope>
.image {
  width: 100%;
  height: px2rem(380px);
  margin-bottom: px2rem(30px);
  background: url('../../assets/images/parking.jpg') center center no-repeat;
  background-size: 100% 100%;
}

.datetime-picker {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: px2rem(600px);
}

.van-cell {
  font-size: px2rem(32px);
}

.parking-time {
  margin-left: px2rem(40px);
  color: #969799;
}

.appoint-button {
  background-color: #3d11ee;
  color: #fff;
  font-size: px2rem(32px);
  width: 86%;
  border-radius: px2rem(10px);
  margin: px2rem(120px) 7%;
  padding: px2rem(25px) 0;
  text-align: center;
}
</style>
