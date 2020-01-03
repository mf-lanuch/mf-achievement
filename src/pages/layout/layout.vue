<template>
    <el-container class="app-container">
        <navmenu />
        <el-container class="app-content" ref="container">
            <appheader ref="appheader" @changeDate="changeDate"/>
            <appmain ref="appmain" @getSearch="getSearch"/>
        </el-container>
    </el-container>
</template>

<script>
import navmenu from './components/navmenu.vue'
import appheader from './components/header.vue'
import appmain from './components/main.vue'

export default {
  name: 'layout',
  components: {
    navmenu,
    appheader,
    appmain
  },
  data () {
    return {
    }
  },
  methods: {
    changeDate (search) {
      this.$refs.appmain.changeDate(search)
    },
    getSearch () {
      let search = this.$refs.appheader.getSearch()
      this.changeDate(search)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/layout/layout.scss";
</style>
