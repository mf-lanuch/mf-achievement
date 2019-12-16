<template>
  <el-main class="app-main">
    <el-tabs v-model="currentTabs" type="border-card" closable @tab-remove="handleRemove" @tab-click='handleClick'>
        <el-tab-pane
          v-for="item in tabs"
          :key="item.name"
          :label="item.title"
          :name="item.name">
            <router-view/>
        </el-tab-pane>
    </el-tabs>
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
    init () {
      let obj = {
        title: '首页',
        name: 'homepage',
        path: '/homepage'
      }
      this.addTab(obj)
    },
    getActiveTab (targetName) {
      console.log(this.tabs)
      let i = 0
      let active = {}
      for (; i < this.tabIndex; i++) {
        let tab = this.tabs[i]
        if (tab.name === targetName) {
          active = tab
          break
        }
      }
      console.log(active)
      this.currentTabs = active.name
    },
    addTab (obj) {
      if (this.map[obj.name] === undefined) {
        this.tabs.push({
          title: obj.title,
          name: obj.name,
          path: obj.path
        })
        this.currentTabs = obj.name
        this.map[obj.name] = obj.name
        this.tabIndex++
      } else {
        this.getActiveTab(obj.name)
      }
    },
    handleClick (tab, event) {
      if (this.tabIndex === 1) {
        return false
      }
      let targetName = tab.name
      let i = 0
      let active = {}
      for (; i < this.tabIndex; i++) {
        let tab = this.tabs[i]
        if (tab.name === targetName) {
          active = tab
          break
        }
      }
      this.currentTabs = active.name
      this.$router.push(active.path)
    },
    handleRemove (targetName) {
      if (this.tabIndex === 1) {
        return false
      }
      let i = 0
      let active = {}
      for (; i < this.tabIndex; i++) {
        let tab = this.tabs[i]
        if (tab.name === targetName) {
          if (i === 0) {
            active = this.tabs[i + 1]
          } else {
            active = this.tabs[i - 1]
          }
          break
        }
      }
      this.currentTabs = active.name
      this.$router.push(active.path)
      delete this.map[targetName]
      this.tabs = this.tabs.filter(tab => tab.name !== targetName)
      this.tabIndex--
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/layout/layout.scss";
</style>
