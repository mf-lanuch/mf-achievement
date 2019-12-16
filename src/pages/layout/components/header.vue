<template>
    <el-header class="header">
        <span class='header-title'>厦门航空传媒科技绩效管理系统</span>
        <el-dropdown>
            <i class="el-icon-setting dropdown"></i>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>范帮年</span>
        <a href='javascript:void(0)'>登出</a>
    </el-header>
</template>
<script>

export default {
  name: 'appheader',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/layout/layout.scss";
</style>
