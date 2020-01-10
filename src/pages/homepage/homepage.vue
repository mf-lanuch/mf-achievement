<template>
  <div id="container">
    <header />
    <div class="row panel-container">
      <div class="panel">
          <div class="panel-body">
            <div class="panel-info">
              <div class="panel-info-rate">
                <p>公司总加班率</p>
                <p class='rate'>{{rate.company}}%</p>
              </div>
              <div class="panel-info-icon">
                  <img src='../../assets/index/company.png'/>
              </div>
            </div>
            <div class="panel-process">
              <el-progress :show-text="false" :stroke-width="12" :percentage="parseInt(rate.company)" class='company'></el-progress>
            </div>
          </div>
          <div class="panel-foot">
            各部门加班总比
          </div>
      </div>
      <div class="panel">
          <div class="panel-body">
            <div class="panel-info">
              <div class="panel-info-rate">
                <p>传统板块加班率</p>
                <p class="rate">{{rate.custome}}%</p>
              </div>
              <div class="panel-info-icon">
                  <img src='../../assets/index/coustom.png'/>
              </div>
            </div>
            <div class="panel-process">
              <el-progress :show-text="false" :stroke-width="12" :percentage="parseInt(rate.custome)" class="custom"></el-progress>
            </div>
          </div>
          <div class="panel-foot">
            传统板块各部门加班总比
          </div>
      </div>
      <div class="panel">
          <div class="panel-body">
            <div class="panel-info">
              <div class="panel-info-rate">
                <p>IT板块加班率</p>
                <p class="rate">{{rate.it}}%</p>
              </div>
              <div class="panel-info-icon">
                <img src='../../assets/index/it.png'/>
              </div>
            </div>
            <div class="panel-process">
              <el-progress :show-text="false" :stroke-width="12" :percentage="parseInt(rate.it)" class="it"></el-progress>
            </div>
          </div>
          <div class="panel-foot">
            IT板块各部门加班总比
          </div>
      </div>
      <div class="panel">
          <div class="panel-body">
            <div class="panel-info">
              <div class="panel-info-rate">
                <p>个人加班时长</p>
                <p><span class="rate">{{rate.personalHour}}</span>小时</p>
              </div>
              <div class="panel-info-icon">
                <img src='../../assets/index/users.png'/>
              </div>
            </div>
            <div class="panel-process">
              <el-progress :show-text="false" :stroke-width="12" :percentage="parseInt(rate.personal)" class="custom"></el-progress>
            </div>
          </div>
          <div class="panel-foot">
            个人加班总时长
          </div>
      </div>
    </div>
    <div class="row body">
      <div class="acievement-type" style="display: flex">
        <el-tabs v-model="activeTab" @tab-click="handleTabClick" style="flex-grow: 1">
          <el-tab-pane label="周统计" name="week">1</el-tab-pane>
          <el-tab-pane label="月统计" name="month">2</el-tab-pane>
        </el-tabs>
        <el-select v-model="weekHour.partId" placeholder="请选择" style="margin: 0 24px" @change="changePeriod">
        <el-option
          v-for="item in deptlist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </div>
      <div class="achievement-data">
        <div class="achievement-week-month">
          <div class="achievement-week-month-title">
            <span>加班时长统计</span>
            <span>单位: 小时</span>
          </div>
          <div class="achievement-week-month-echart">
            <v-echart name="weekhourchart" :options="options.weekHour" :auto-resize="true" />
          </div>
        </div>
        <div class="achievement-week-month">
          <div class="achievement-week-month-title">
            <span>同期加班时长对比</span>
            <span>单位: 小时</span>
          </div>
          <div class="achievement-week-month-echart">
            <v-echart name="weekComphourchart" :options="options.weekHourComp" :auto-resize="true" />
          </div>
        </div>
      </div>
    </div>
    <div class="row foot">
      <div class="achievement-table">
          <div class="title">统计表</div>
          <div class="body">
            <el-table :data="tableData" border style="width: 100%; height: 100%">
              <el-table-column prop="module" label="板块" align="center"></el-table-column>
              <el-table-column prop="hour" label="加班时长" align="center"></el-table-column>
              <el-table-column prop="rate" label="加班率" align="center"></el-table-column>
              <el-table-column prop="comp" label="同期对比" align="center"></el-table-column>
          </el-table>
          </div>
      </div>
      <div class="achievement-circle">
        <div class="title">各部门加班时长统计</div>
        <v-echart name="partyCompchart" :options="options.partyComp" :auto-resize="true" />
      </div>
    </div>
  </div>
</template>

<script>
import {getOverTimeRate, getPersonalOvertime, getPeriodOvertimeWeek, getPartOvertime, getPeriodOvertime, getOverTimeForAll} from '../../api/index'
// import echarts from 'echarts'
import 'echarts'
import ECharts from 'vue-echarts/components/ECharts.vue'
import util from '../../utils/utils'
export default {
  name: 'homepage',
  components: {
    'v-echart': ECharts
  },
  data () {
    return {
      userInfo: undefined,
      activeTab: 'week',
      newTab: 'week',
      weekHourHeight: undefined,
      deptlist: [
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
      tableData: [{
        module: '传媒科技',
        hour: undefined,
        rate: undefined,
        comp: undefined
      }, {
        module: 'IT板块',
        hour: undefined,
        rate: undefined,
        comp: undefined
      }, {
        module: '传统板块',
        hour: undefined,
        rate: undefined,
        comp: undefined
      }],
      rate: {
        company: 0,
        custome: 0,
        it: 0,
        personal: 0,
        personalHour: 0
      },
      weekHour: {
        partId: undefined,
        workStartDate: undefined,
        workEndDate: undefined
      },
      weekMonth: {
        partId: undefined,
        pcode: undefined,
        workMonthEnd: undefined,
        workMonthStart: undefined,
        workYearEnd: undefined,
        workYearStart: undefined
      },
      options: {
        weekHour: undefined,
        personal: undefined,
        partyComp: undefined,
        weekHourComp: undefined
      },
      search: undefined
    }
  },
  methods: {
    getSearch () {
      this.$emit('getSearch')
    },
    changeDate (search) {
      let startDate = new Date(search.startDate)
      let endDate = new Date(search.endDate)
      this.weekHour.workStartDate = util.parseTime(startDate, '{y}-{m}-{d}')
      this.weekHour.workEndDate = util.parseTime(endDate, '{y}-{m}-{d}')
      this.weekMonth.workMonthEnd = endDate.getMonth() + 1
      this.weekMonth.workMonthStart = startDate.getMonth() + 1
      this.weekMonth.workYearEnd = endDate.getFullYear()
      this.weekMonth.workYearStart = startDate.getFullYear()
      this.init()
    },
    handleTabClick (tab, event) {
      if (this.newTab === this.activeTab) {
        return
      } else if (tab.name === 'week') {
        this.newTab = 'week'
        this.getPeriodOvertimeWeek()
      } else if (tab.name === 'month') {
        this.newTab = 'month'
        this.getPeriodOvertime()
      }
      console.log(tab.name)
    },
    changePeriod () {
      if (this.activeTab === 'week') {
        this.getPeriodOvertimeWeek()
      } else if (this.activeTab === 'month') {
        this.getPeriodOvertime()
      }
    },
    getPeriodOvertime () {
      let that = this
      let param = {
        partId: this.weekMonth.partId,
        workMonthEnd: this.weekMonth.workMonthEnd,
        workMonthStart: this.weekMonth.workMonthStart,
        workYearEnd: this.weekMonth.workYearEnd,
        workYearStart: this.weekMonth.workYearStart
      }
      getPeriodOvertime(param).then(response => {
        let datax = []
        let value = []
        let compValue = []
        for (let i = 0; i < response.data.object.length; i++) {
          let obj = response.data.object[i]
          datax.push(obj.workYear + '-' + obj.workMonth)
          value.push(obj.talOverTime === null ? 0 : parseInt(obj.talOverTime / 3600))
          compValue.push(obj.talOverTime === null ? 0 : parseInt(obj.lastOverTime / 3600))
        }
        this.createWeekHour(datax, value)
        this.createWeekHourComp(datax, that.weekMonth.workYearStart, that.weekMonth.workYearStart - 1, value, compValue)
      }).catch(error => {
        console.log(error)
      })
    },
    getPersonalOvertime () {
      let that = this
      let params = {
        pcode: this.weekMonth.pcode,
        workEndDate: this.weekHour.workEndDate,
        workStartDate: this.weekHour.workStartDate
      }
      getPersonalOvertime(params).then(response => {
        console.log(response)
        let data = response.data.object
        that.rate.personalHour = util.isNull(data.totalOverTime) ? 0 : (data.totalOverTime / 3600).toFixed(2)
        if (util.isNull(data.totalOverTime)) {
          that.rate.personal = 0
        } else if (util.isNull(data.totalWorkTime)) {
          that.rate.personal = 100
        } else {
          that.rate.personal = Math.ceil(data.totalOverTime / data.totalWorkTime)
        }
        console.log('--')
        console.log(that.rate)
      }).catch(error => {
        that.$notify.error({
          title: '错误',
          message: error
        })
      })
    },
    getOverTimeRateComp () {
      let param = {
        workEndDate: this.weekHour.workEndDate,
        workStartDate: this.weekHour.workStartDate
      }
      let that = this
      getOverTimeForAll(param).then(response => {
        if (response.data.status === 200) {
          that.tableData[0].hour = util.formatHour(response.data.object.companyitOvertime.totalOverTime)
          that.tableData[0].rate = that.formatPercent(response.data.object.companyitOvertime.overTimeRate)
          that.tableData[0].comp = that.formatPercent(response.data.object.companyitOvertime.periodOvertimeRate)
          that.tableData[1].hour = util.formatHour(response.data.object.itOvertime.totalOverTime)
          that.tableData[1].rate = that.formatPercent(response.data.object.itOvertime.overTimeRate)
          that.tableData[1].comp = that.formatPercent(response.data.object.itOvertime.periodOvertimeRate)
          that.tableData[2].hour = util.formatHour(response.data.object.traditionOvertime.totalOverTime)
          that.tableData[2].rate = that.formatPercent(response.data.object.traditionOvertime.overTimeRate)
          that.tableData[2].comp = that.formatPercent(response.data.object.traditionOvertime.periodOvertimeRate)
        } else {
          that.$notify.error({
            title: '错误',
            message: response.data.message
          })
        }
      }).catch(error => {
        that.$notify.error({
          title: '错误',
          message: error
        })
      })
    },
    getOverTimeRate () {
      let param = {
        workEndDate: this.weekHour.workEndDate,
        workStartDate: this.weekHour.workStartDate
      }
      let that = this
      getOverTimeRate(param).then(response => {
        console.log(response)
        if (response.data.status === 200) {
          that.rate.company = that.formatPercent(response.data.object.companyitOvertimeRate)
          that.rate.custome = that.formatPercent(response.data.object.traditionOvertimeRate)
          that.rate.it = that.formatPercent(response.data.object.itOvertimeRate)
        } else {
          that.$notify.error({
            title: '错误',
            message: response.data.message
          })
        }
      }).catch(error => {
        that.$notify.error({
          title: '错误',
          message: error
        })
      })
    },
    formatPercent (value) {
      // value *= 100
      return value.toFixed(2)
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
      let param = {
        partId: this.weekHour.partId,
        workStartDate: this.weekHour.workStartDate
      }
      getPeriodOvertimeWeek(param).then(response => {
        let map = {}
        let weekDay = util.getWeekDays(param.workStartDate)
        for (let i = 0; i < response.data.object.length; i++) {
          let obj = response.data.object[i]
          map[this.parseTime(obj.workDate)] = obj.talOverTime == null ? 0 : parseInt(obj.talOverTime / 3600)
        }
        let weekValue = []
        for (let i = 0; i < weekDay.length; i++) {
          if (util.isNull(map[weekDay[i]])) {
            weekValue.push(0)
          } else {
            weekValue.push(map[weekDay[i]])
          }
        }

        let weekDayComp = util.getWeekDaysComp(param.workStartDate)
        let weekValueComp = []
        for (let i = 0; i < weekDayComp.length; i++) {
          if (util.isNull(map[weekDayComp[i]])) {
            weekValueComp.push(0)
          } else {
            weekValueComp.push(map[weekDayComp[i]])
          }
        }
        let date = new Date(param.workStartDate)
        let year = date.getFullYear()

        this.createWeekHour(['周一', '周二', '周三', '周四', '周五', '周六', '周日'], weekValue)
        this.createWeekHourComp(['周一', '周二', '周三', '周四', '周五', '周六', '周日'], year - 1, year, weekValueComp, weekValue)
      }).catch(error => {
        console.log(error)
      })
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
          orient: 'vertical',
          left: 10,
          top: 20,
          bottom: 10,
          data: data
          // selected: data.splice(5)
        },
        series: [{
          name: '部门',
          type: 'pie',
          radius: '55%',
          center: ['65%', '50%'],
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
      this.options.partyComp = option
    },
    getPartOvertime () {
      let that = this
      let param = {
        workStartDate: this.weekHour.workStartDate,
        workEndDate: this.weekHour.workEndDate
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
            offset: 0, color: 'rgba(53, 195, 255, 0.85)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(24, 144, 255, 0.85)' // 100% 处的颜色
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
          left: '32px',
          right: '32px',
          bottom: '20px',
          top: '24px',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: weekDay,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '',
          type: 'bar',
          barWidth: '34px',
          data: weekValue
        }]
      }
      this.options.weekHour = option
    },
    createWeekHourComp (weekDay, yearComp, year, weekValue, value) {
      let option = {
        color: ['#4ABCFF', '#F7B500'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [ yearComp + '年', year + '年' ]
        },
        grid: {
          left: '32px',
          right: '32px',
          bottom: '20px',
          top: '24px',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: weekDay
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          smooth: true,
          name: yearComp + '年',
          type: 'line',
          barWidth: '60%',
          stack: '总量',
          data: weekValue
        }, {
          smooth: true,
          name: year + '年',
          type: 'line',
          stack: '总量',
          barWidth: '60%',
          data: value
        }]
      }
      this.options.weekHourComp = option
    },
    init () {
      this.getOverTimeRate()
      this.getOverTimeRateComp()
      this.getPersonalOvertime()
      if (this.activeTab === 'week') {
        this.getPeriodOvertimeWeek()
      } else {
        this.getPeriodOvertime()
      }
      this.getPartOvertime()
    }
  },
  created () {
    this.userInfo = this.$store.getters.userInfo
    this.weekHour.partId = this.userInfo.partId
    this.weekMonth.pcode = this.userInfo.pcode
    this.weekMonth.partId = this.userInfo.partId
  },
  mounted () {
    this.getSearch()
  }
}
</script>

<style lang='scss' scoped>
@import "../../styles/homepage/homepage.scss";
</style>
<style lang="scss" scoped>
#container {
  /deep/ {
    .el-select {
      input {
        border: 0;
        color: #000000
      }
    }
    .el-table__header .has-gutter > tr > th{
      background: #FAFAFA;
      border: 1px solid rgba(151, 151, 151, .19)
    }
    .el-table__header .has-gutter > tr > th + th {
      border-left: 0
    }
    .el-table__header .has-gutter > tr > th:last-child {
      background: 0;
      border: 0;
    }
    .company {
      .el-progress-bar__inner {
        background-color: rgba(43, 157, 254, 1);
        border-radius: 1px;
      }
    }
    .custom  {
      .el-progress-bar__inner {
        background-color: rgba(21, 188, 131, 1);
        border-radius: 1px;
      }
    }
    .it  {
      .el-progress-bar__inner {
        background-color: rgba(150, 78, 251, 1);
        border-radius: 1px;
      }
    }

    .el-tabs__nav-wrap:after {
      background-color: #fff;
    }
    .el-tabs__content {
      display: none
    }

    .echarts {
      height: 100% !important;
      width: 100% !important
    }
    .el-table--border {
      border: 0
    }
    .el-table tr {
      td:first-child, th:first-child {
        border-left: 1px solid #ebeef5
      }
    }
    .el-table--border::before, .el-table--border::after {
      background: none
    }

    .el-table__header-wrapper {
      border-top: 1px solid #ebeef5
    }
    .el-progress-bar__outer {
      border-radius: 2px;
    }
  }
}
</style>
