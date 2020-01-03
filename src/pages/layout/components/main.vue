<template>
  <el-main class="app-main">
    <router-view ref="view" @getSearch="getSearch"/>
  </el-main>
</template>
<script>

export default {
  name: 'appmain',
  data () {
    return {
      tabs: [],
      map: {},
      tabIndex: 0,
      currentTabs: undefined
    }
  },
  methods: {
    changeDate (search) {
      this.$refs.view.changeDate(search)
    },
    getSearch () {
      this.$emit('getSearch')
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/layout/layout.scss";
</style>
