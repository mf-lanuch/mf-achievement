<template>
    <div class="app-container">
      <div class="row listPersonalOtDetail">
          <el-table :data="records.otdetail" style="width: 100%" height="360">
              <el-table-column align="center" prop="pcode" label="工号"></el-table-column>
              <el-table-column align="center" prop="workDate" label="日期" width='100'></el-table-column>
              <el-table-column align="center" prop="otStartTime" label="开始时间"></el-table-column>
              <el-table-column align="center" prop="otEndTime" label="结束时间"></el-table-column>
              <el-table-column align="center" prop="startTime" label="上班刷卡"></el-table-column>
              <el-table-column align="center" prop="endTime" label="下班刷卡"></el-table-column>
              <el-table-column align="center" label="持续小时">
                <template slot-scope="scope">
                  {{formatOtTime(scope.row.actOt)}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="折合小时">
                <template slot-scope="scope">
                  {{formatOtTime(scope.row.ot)}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="类型">
                  <template>调休</template>
              </el-table-column>
              <el-table-column align="center" label="事由" width="218">
                  <template>厦门航空传媒科技视频制作</template>
              </el-table-column>
              <el-table-column align="center" label="状态">
                  <template>已通过</template>
              </el-table-column>
          </el-table>
          <el-pagination v-if="records.otdetail.length > 0"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" background
            :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
            layout="prev, pager, next, total, sizes">
          </el-pagination>
      </div>
      <div class="row listPersonaOvertime">
        <el-table :data="records.overtime" style="width: 100%" height="280">
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column align="center" label="加班小时数(计费)">
            <template>
              0
            </template>
          </el-table-column>
          <el-table-column align="center" label="加班小时数(调休)">
            <template slot-scope="scope">
              {{(scope.row.totalOverTime / 3600).toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="总加班小时数">
            <template slot-scope="scope">
              {{(scope.row.totalOverTime / 3600).toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="调休小时数">
            <template slot-scope="scope">
              {{(scope.row.totalOverTime / 3600).toFixed(2)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import util from '../../utils/utils'
import {listPersonalOtDetail, listPersonaOvertime} from '../../api/index'
export default {
  name: 'overtimeRecord',
  data () {
    return {
      pcode: undefined,
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
      this.listPersonalOtDetail()
      this.listPersonaOvertime()
    },
    listPersonalOtDetail () {
      let that = this
      let param = {
        pageIndex: this.page,
        pageSize: this.pageSize,
        pcode: this.pcode || this.weekMonth.pcode,
        workEndDate: this.weekHour.workEndDate,
        workStartDate: this.weekHour.workStartDate
      }
      listPersonalOtDetail(param).then(response => {
        console.log(response)
        let obj = response.data.object
        that.total = obj.recordTotal
        that.records.otdetail = obj.list
      }).catch(error => {
        that.$notify.error(error)
      })
    },
    listPersonaOvertime () {
      let that = this
      let param = {
        pcode: this.pcode || this.weekMonth.pcode,
        workStartDate: this.weekHour.workStartDate,
        workEndDate: this.weekHour.workEndDate,
        pageIndex: 1,
        pageSize: 100
      }
      listPersonaOvertime(param).then(response => {
        that.records.overtime = response.data.object.list
      }).catch(error => {
        that.$message.error(error)
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
      this.listPersonalOtDetail()
    },
    handleCurrentChange (value) {
      this.page = value
      this.listPersonalOtDetail()
    }
  },
  created () {
    this.pcode = this.$route.params.pcode
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
@import "src/styles/overtimeRecord/overtimeRecord.scss";
</style>
<style lang='scss' scoped>
.app-container {
    /deep/ {
      .el-table td, .el-table th {
        padding: 10px 0
      }
      .el-pagination {
        padding: 17px 5px;
        text-align: right
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
