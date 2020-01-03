<template>
    <div class="app-container">
      <div class="row listPersonalOtDetail">
          <el-table :data="records.otdetail" style="width: 100%" height="660px">
              <el-table-column align="center" prop="pcode" label="工号"></el-table-column>
              <el-table-column align="center" prop="pname" label="姓名"></el-table-column>
              <el-table-column align="center" prop="workDate" label="日期"></el-table-column>
              <el-table-column align="center" prop="workStatus" label="状态"></el-table-column>
              <el-table-column align="center" prop="startTime" label="上班刷卡"></el-table-column>
              <el-table-column align="center" prop="endTime" label="下班刷卡"></el-table-column>
          </el-table>
          <el-pagination v-if="records.otdetail.length > 0"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" background
            :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
            layout="prev, pager, next, total, sizes">
          </el-pagination>
      </div>
    </div>
</template>

<script>
import util from '../../utils/utils'
import {getPersonalAttenceList} from '../../api/index'
export default {
  name: 'attendancDetails',
  data () {
    return {
      userInfo: undefined,
      records: {
        otdetail: [],
        overtime: []
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
      page: 1,
      pageSize: 10,
      total: undefined
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
    init () {
      this.getPersonalAttenceList()
    },
    getPersonalAttenceList () {
      let that = this
      let param = {
        pageIndex: this.page,
        pageSize: this.pageSize,
        pcode: this.weekMonth.pcode,
        workEndDate: this.weekHour.workEndDate,
        workStartDate: this.weekHour.workStartDate
      }
      getPersonalAttenceList(param).then(response => {
        console.log(response)
        let obj = response.data.object
        that.total = obj.recordTotal
        that.records.otdetail = obj.list
      }).catch(error => {
        that.$notify.error(error)
      })
    },
    formatOtTime (value) {
      if (util.isNull(value)) {
        return 0
      }
      let minute = util.getMinute(value)
      let result = minute / 60
      return result.toFixed(2)
    },
    formatNumber (value) {
      return util.formatNumber(value)
    },
    handleSizeChange (value) {
      this.pageSize = value
      this.getPersonalAttenceList()
    },
    handleCurrentChange (value) {
      this.page = value
      this.getPersonalAttenceList()
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
@import "src/styles/attendancDetails/attendancDetails.scss";
</style>
<style lang='scss' scoped>
.app-container {
    /deep/ {
      .el-table td, .el-table th {
        padding: 10px 0
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
      .el-pagination {
        padding: 17px 5px;
        text-align: right
      }
      ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
      }

      ::-webkit-scrollbar-thumb {
          height: 8px;
          background-color: #ccc;
          border-radius: 8px;
          outline: 2px solid #fff;
          outline-offset: -2px;
          border: 2px solid #fff;
      }

      ::-webkit-scrollbar-track-piece {
          background-color: #fff;
          border-radius: 3px;
      }
    }
}
</style>
