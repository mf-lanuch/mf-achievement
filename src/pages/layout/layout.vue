<template>
    <el-container class="app-container">
        <navmenu @menuClick="menuClick"/>
        <el-container class="app-content">
            <appheader />
            <appmain ref="appmain"/>
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
  methods: {
    menuClick (obj) {
      this.$refs.appmain.addTab(obj)
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/layout/layout.scss";
</style>
