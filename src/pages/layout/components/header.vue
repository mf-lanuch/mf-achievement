<template>
    <el-header class="header">
        <span class='header-title'>
          <div class="search-item">
            <span>起始日期</span>
            <el-date-picker v-model="search.startDate" type="date" placeholder="选择日期" @change="changeDate"> </el-date-picker>
          </div>
          <div class="search-item">
            <span>结束日期</span>
            <el-date-picker v-model="search.endDate" type="date" placeholder="选择日期" @change="changeDate"> </el-date-picker>
          </div>
        </span>
        <img src="../../../assets/index/search.png" />
        <img src="../../../assets/index/userInfo.png" />
        <el-badge :value="12" class="item">
          <img src="../../../assets/index/message.png" />
        </el-badge>
        <div class="header-ava">
          <img src="../../../assets/index/logo-user.png" />
        </div>
        <span>范帮年</span>
        <el-dropdown>
          <img src="../../../assets/index/dropdown.png" class="dropdown"/>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>
<script>

export default {
  name: 'appheader',
  data () {
    return {
      search: {
        startDate: new Date('2019-12-02'),
        endDate: new Date('2019-12-31')
      }
    }
  },
  methods: {
    changeDate () {
      this.$emit('changeDate', this.search)
    },
    getSearchDate () {
      return this.search
    },
    getSearch () {
      return this.search
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/layout/layout.scss";
</style>
<style lang="scss" scoped>
.header {
  /deep/ {
    .search-item .el-icon-date:before {
      color: #3390FF !important
    }
    .el-badge__content.is-fixed {
      top: 22px;
      left: 0
    }
    .el-badge__content {
      background: none;
      border: none;
      color: red;
      height: 12px;
      width: 12px;
      line-height: 12px;
      padding: 4px;
      font-size: 10px;
      font-weight: bold;
    }
  }
}
</style>
