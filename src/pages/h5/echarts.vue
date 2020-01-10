<template>
    <div class="app-container" style="background: rgb(223, 223, 223)">
      <img class="bg" src="../../assets/h5/background.png"/>
      <div class="app-body">
        <div class="app-body-header">
            <img src="../../assets/h5/arrow-left.png" />
            <span>加班统计</span>
            <img src="../../assets/h5/datepicker.png" class='datapicker' @click="handleOpenPicker"/>
        </div>
        <div class="app-body-title">
            <img src="../../assets/h5/over-time-week.png" />
            <span>周统计</span>
        </div>
        <div class="app-body-week-echerts">
            <div class="echarts-header">
                <span class="overtime">加班时长统计</span>
                <span class="unit">单位: 小时/天</span>
                <span class="dept" @click="handleDeptPicker">{{deptName}}</span>
                <img src="../../assets/h5/arrows-bottom.png" @click="handleDeptPicker"/>
            </div>
            <div class="weekhour">
                <v-echart name="weekhourchart" :options="options.weekHour" :auto-resize="true"/>
            </div>
        </div>
        <div class='app-body-rate'>
            <div class="row personal">
                <div class="header">个人加班时长</div>
                <div class="rate">
                    <span>{{rate.personal}}</span>
                    <span>小时</span>
                    <img src="../../assets/h5/users.png" />
                </div>
                <div class="panel-process">
                    <el-progress :show-text="false" :stroke-width="12" :percentage="formatInt(rate.personalRate)" class='personal'></el-progress>
                </div>
                <div class="foot">
                    个人加班总时长
                </div>
            </div>
            <div class="row company">
                <div class="header">公司总加班率</div>
                <div class="rate">
                    <span>{{rate.company}}%</span>
                    <span></span>
                    <img src="../../assets/h5/over-time.png" />
                </div>
                <div class="panel-process">
                    <el-progress :show-text="false" :stroke-width="12" :percentage="formatInt(rate.company)" class='company'></el-progress>
                </div>
                <div class="foot">
                    公司加班率
                </div>
            </div>
        </div>
        <div class="app-body-week-echerts">
            <div class="echarts-header">
                <span class="overtime">加班时长统计</span>
                <span class="unit">单位: 小时/天</span>
            </div>
            <div class="weekhourpie">
                <v-echart name="weekhourchartPie" :options="options.weekHourPie" :auto-resize="true"/>
            </div>
        </div>
      </div>
      <mt-datetime-picker ref='datepicker' type='date' @confirm='handleConfirm' v-model="startDate">
      </mt-datetime-picker>
      <mt-popup position="bottom" v-model="popupVisible" class='select-dept'>
        <div class="picker-header">
            <span @click="popupVisible = false">取 消</span>
            <span class='dept'>选择部门</span>
            <span @click="handleClickPicker">确 定</span>
        </div>
        <mt-picker :slots="list.dept" @change='handleChangeDept' value-key='label'></mt-picker>
      </mt-popup>
    </div>
</template>
<script>
import {DateTimerPicker, Picker, Popup} from 'mint-ui'
import util from '../../utils/utils'
import {getPeriodOvertimeWeek, getPartOvertime, getOverTimeRate, getPersonalOvertime} from '../../api/index'
import 'echarts'
import ECharts from 'vue-echarts/components/ECharts.vue'

export default {
  name: 'echartspage',
  components: {
    DateTimerPicker,
    Picker,
    Popup,
    'v-echart': ECharts
  },
  data () {
    return {
      popupVisible: false,
      //   startDate: util.parseTime(new Date(), '{y}-{m}-{d}'),
      startDate: '2019-12-27',
      deptName: '商务营销开发中心',
      deptId: '122E5E13ABFA47548F41D594CED5210E',
      defaultIndex: 0,
      pickerValue: undefined,
      rate: {
        personal: undefined,
        company: undefined,
        personalRate: undefined
      },
      list: {
        dept: [
          {
            flex: 1,
            values: [
              {label: '《品》杂志社', value: '00703E4530494770B7519B88DE91F26D'},
              {label: '生产运行开发中心', value: '122E5E13ABFA47548F41D594CED5210E'},
              {label: '综合处', value: '16F3E95E6BDA4F9A9B473AB2DCAE1924'},
              {label: '质控中心', value: '1D726FCF975C44289F4ADAC9213D6B7B'},
              {label: '品牌中心', value: '34AE0C63779F48BC8EEA2CA0105EE11A'},
              {label: '《天空之城》运营中心', value: '37BA657E8A5541FD88E552B22297C5E7'},
              {label: '《厦门航空》杂志社', value: '41A5367A80D44D979725CE92CBA3DFCC'},
              {label: '财务处', value: '43E4109CC6D446FC80A05FC5C34871DB'},
              {label: '河北航办事处', value: '62DB34EBCF52471DA6750E2AE49BBC8B'},
              {label: '商务营销开发中心', value: '7B3DAB9E4E924D99B993D74907F349E2'},
              {label: '音像中心', value: 'A7C4058581194CDBB933E91CD4499FFE'},
              {label: '电商中心', value: 'D3BDE2F830BD47E1B8706952A0B4EC73'},
              {label: '行政服务开发中心', value: 'E8F0FFCCBC844D808DBFD424A6B5E014'}
            ],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      },
      options: {
        weekHour: undefined,
        weekHourPie: undefined
      }
    }
  },
  methods: {
    init () {
      this.getPeriodOvertimeWeek()
      this.getPartOvertime()
      this.getOverTimeRate()
      this.getPersonalOvertime()
    },
    handleOpenPicker () {
      this.$refs.datepicker.open()
    },
    handleConfirm (value) {
      this.startDate = util.parseTime(value, '{y}-{m}-{d}')
      this.init()
    },
    handleChangeDept (picker, values) {
      this.pickerValue = values
      console.log(this.pickerValue)
    },
    handleClickPicker () {
      this.deptName = this.pickerValue[0].label
      this.deptId = this.pickerValue[0].value
      this.popupVisible = false
      this.getPeriodOvertimeWeek()
    },
    handleDeptPicker () {
      this.defaultIndex = 0
      // let values = this.list.dept[0].values
      // for (let i = 0; i < values.length; i++) {
      //   let value = values[i]
      //   if (value.value === this.deptId) {
      //     this.defaultIndex = i
      //   }
      // }
      this.popupVisible = true
    },
    formatInt (value) {
      let val = parseInt(value)
      console.log(val)
      return val
    },
    parseTime (value) {
      let date = new Date(value.substring(0, 10))
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '-' + this.formatValue(month) + '-' + this.formatValue(day)
    },
    formatValue (val) {
      if (val < 10) {
        return '0' + val
      }
      return val
    },
    getPeriodOvertimeWeek () {
      let that = this
      let param = {
        partId: that.deptId,
        workStartDate: that.startDate
      }
      getPeriodOvertimeWeek(param).then(response => {
        let map = {}
        let weekDay = util.getWeekDays(param.workStartDate)
        for (let i = 0; i < response.data.object.length; i++) {
          let obj = response.data.object[i]
          map[this.parseTime(obj.workDate)] = obj.talOverTime == null ? 0 : parseInt(obj.talOverTime / 3600).toFixed(2)
        }
        let weekValue = []
        for (let i = 0; i < weekDay.length; i++) {
          if (util.isNull(map[weekDay[i]])) {
            weekValue.push(0)
          } else {
            weekValue.push(map[weekDay[i]])
          }
        }
        that.createWeekHour(['周一', '周二', '周三', '周四', '周五', '周六', '周日'], weekValue)
      })
    },
    getOverTimeRate () {
      let param = {
        workEndDate: this.startDate,
        workStartDate: util.getMonthStart(this.startDate)
      }
      let that = this
      getOverTimeRate(param).then(response => {
        console.log(response)
        if (response.data.status === 200) {
          that.rate.company = response.data.object.companyitOvertimeRate.toFixed(2)
        } else {
          that.$notify.error({
            title: '错误',
            message: response.data.message
          })
        }
      })
    },
    getPersonalOvertime () {
      let that = this
      let params = {
        pcode: '00045',
        workEndDate: this.startDate,
        workStartDate: util.getMonthStart(this.startDate)
      }
      getPersonalOvertime(params).then(response => {
        let data = response.data.object
        that.rate.personal = util.isNull(data.totalOverTime) ? 0 : (data.totalOverTime / 3600).toFixed(2)
        if (util.isNull(data.totalOverTime)) {
          that.rate.personalRate = 0
        } else if (util.isNull(data.totalWorkTime)) {
          that.rate.personalRate = 100
        } else {
          that.rate.personalRate = parseInt(that.rate.personal)
        }
        console.log(that.rate)
      })
    },
    getPartOvertime () {
      let that = this
      let param = {
        workStartDate: util.getMonthStart(this.startDate),
        workEndDate: this.startDate
      }
      getPartOvertime(param).then(response => {
        console.log(response)
        let data = response.data.object
        that.createPartCircle(data)
      }).catch(error => {
        console.log(error)
      })
    },
    createWeekHour (weekDay, weekValue) {
      let option = {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#FFD57C' // 0% 处的颜色
          }, {
            offset: 1, color: '#FF9C1D' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '1rem',
          right: '1rem',
          top: '24px',
          bottom: 'top',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: weekDay,
          axisTick: {
            alignWithLabel: true,
            textStyle: {
              fontSize: '7.8'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              opacity: 0
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#e9e9e9'],
              width: 1,
              type: 'dashed'
            }
          }
        }],
        series: [{
          name: '',
          type: 'bar',
          barWidth: '24px',
          data: weekValue
        }]
      }
      this.options.weekHour = option
    },
    createPartCircle (d) {
      let data = []
      let value = []
      d.forEach(item => {
        data.push(item.partName)
        value.push({
          name: item.partName,
          value: item.talOverTime == null ? 10 : (item.talOverTime / 3600).toFixed(2)
        })
      })
      let option = {
        color: [
          '#DE1D67', '#E11734', '#E15C24', '#F9B72C', '#6BB738', '#11986D', '#1894AC', '#1890DD',
          '#1278BB', '#10438C', '#50206A', '#752B78', '#D71F7E'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          top: 16,
          textStyle: {
            fontSize: 9
          },
          data: data
          // selected: data.splice(5)
        },
        series: [{
          name: '部门',
          type: 'pie',
          radius: '50%',
          center: ['50%', '60%'],
          data: value,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            normal: {
              label: {
                show: true,
                formatter: '{d}%'
              },
              labelLine: {
                show: true
              }
            }
          }
        }]
      }
      this.options.weekHourPie = option
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.select-dept {
    width: 100%;
    background: #fff;
}
.picker-header {
  padding: 1rem;
  display: flex;
  span {
    color: #32BBFF;
  }
  .dept {
    flex-grow: 1;
    color: #000;
  }
}
.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .app-body {
    position: relative;
    z-index: 1;
    padding: 1rem 1rem 0;
    .app-body-header {
        display: flex;
        align-items: center;
        img {
            height: 0.8rem;
        }
        span {
            font-size: 1.2rem;
            color: #fff;
            flex-grow: 1;
        }
        img.datapicker{
            height: 1.5rem;
        }
    }
    .app-body-title {
        margin-top: 1.5rem;
        text-align: left;
        img {
            display: inline-block;
            vertical-align: middle;
            height: 1.2rem;
            margin-right: 0.5rem;
        }
        span {
            display: inline-block;
            vertical-align: middle;
            font-size: 1rem;
            color: #fff;
        }
    }
    .app-body-week-echerts {
        margin: 1rem 0;
        background: #fff;
        border-radius: 0.5rem;
        padding: 0.8rem;
        .echarts-header {
            display: flex;
            align-items: center;
            .overtime {
                font-size: 0.5rem;
                color: rgba($color: #000000, $alpha: 0.85);
                margin-right: 0.5rem;
            }
            .unit {
                font-size: 0.5rem;
                flex-grow: 1;
                color: rgba($color: #000000, $alpha: 0.49);
                text-align: left;
            }
            .dept {
                font-size: 0.8rem;
                color: rgba($color: #000000, $alpha: 0.65)
            }
            img {
                margin-left: 0.5rem;
                height: 0.5rem;
            }
        }
        .weekhour .echarts {
            width: 100%;
            height: 10rem;
        }
        .weekhourpie .echarts {
            width: 100%;
            height: 12rem;
        }
    }
    .app-body-rate {
        display: flex;
        margin-top: 1rem;
        .row {
            padding: 1rem;
            background: #fff;
            border-radius: 0.5rem;
            width: 50%;
            .header {
                color: rgba($color: #000000, $alpha: 0.70);
                font-size: 0.75rem;
                text-align: left;
                margin-bottom: 0.6rem;
            }
            .rate {
                display: flex;
                align-items: center;
                span {
                    color:rgba($color: #000000, $alpha: 0.6);
                    font-size: 0.6rem;
                    flex-grow: 1;
                    text-align: left;
                }
                span:first-child {
                    color: rgba($color: #000000, $alpha: 1);
                    font-size: 1rem;
                    flex-grow: 0;
                }
            }
            img {
                width: 1.6rem;
            }
            .panel-process {
                margin-top: 1.51rem;
                margin-bottom: 0.8rem;
            }
            .foot {
                padding-top: 0.6rem;
                border-top: 1px solid #E8E8E8;
                font-size: 0.7rem;
                color: rgba($color: #000000, $alpha: 0.45);
                text-align: left;
            }
        }
        .row + .row {
            margin-left: 0.6rem;
        }
    }
  }

  /deep/ {
    .personal .el-progress-bar__inner {
        background: #15BC83
    }
    .company .el-progress-bar__inner {
        background: linear-gradient(to right, #32BBFF, #2B9DFE)
    }
    .el-progress-bar__inner,.el-progress-bar__outer {
        border-radius: 2px;
    }
  }
}
</style>
