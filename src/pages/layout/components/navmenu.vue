<template>
    <el-aside class='nav-menu'>
      <div class="logo">
        <img src="../../../assets/index/logo@2x.png"/>
        <span>厦航传科考勤系统</span>
      </div>
      <!-- <el-button icon='el-icon-d-arrow-left' v-if="!isCollapse" @click="isCollapse = !isCollapse"></el-button>
      <el-button icon='el-icon-d-arrow-right' v-else @click="isCollapse = !isCollapse"></el-button> -->
      <el-menu class="menu" :default-openeds="openMenu" v-if="menus" :collapse="isCollapse">
        <template v-for="item in menus.children">
          <el-submenu :index="item.path" :key="item.title" v-if="item.children.length > 0">
            <template slot="title">
              <svgIcon v-if="item.icon" :path="item.icon" ></svgIcon>
              <span>{{item.name}}</span>
              <router-link :to="item.path">
                  <img v-if="item.icon" :src="'../../../assets/index/' + item.icon + '.png'" />
                  <span>{{item.title}}</span>
              </router-link>
              </template>
              <template v-for="child in item.children">
              <el-menu-item :index="child.path" :key="child.title">
                  <img v-if="child.icon" :src="'../../../assets/index/' + child.icon + '.png'" />
                  <span>{{child.title}}</span>
                  <router-link :to="child.path" @click.native="handleClick(child)">
                      <img v-if="child.icon" :src="'../../../assets/index/' + child.icon + '.png'" />
                      <span>{{child.title}}</span>
                  </router-link>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :index="item.path" :key="item.title">
              <router-link :to="item.path">
                  <svgIcon v-if="item.icon" :path="item.icon" ></svgIcon>
                  <span>{{item.title}}</span>
              </router-link>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
</template>

<script>
import svgIcon from './imgIcon.vue'

export default {
  name: 'navmenu',
  components: {
    svgIcon
  },
  data () {
    return {
      menus: [],
      openMenu: [],
      isCollapse: false
    }
  },
  methods: {
  },
  created () {
    this.menus = this.$store.getters.menus
    if (this.menus) {
      this.openMenu = this.menus.children.map(item => item.path)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/layout/layout.scss";
</style>
<style lang="scss"  scoped>
.nav-menu {
  /deep/ {
    .el-menu-item, .el-submenu__title {
      line-height: 48px;
    }
  }
}
</style>
