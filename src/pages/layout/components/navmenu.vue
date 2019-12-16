<template>
    <el-aside class='nav-menu'>
        <el-button icon='el-icon-d-arrow-left' v-if="!isCollapse" @click="isCollapse = !isCollapse"></el-button>
        <el-button icon='el-icon-d-arrow-right' v-else @click="isCollapse = !isCollapse"></el-button>
        <el-menu class="menu" :default-openeds="openMenu" v-if="menus" :collapse="isCollapse">
            <template v-for="item in menus.children">
            <el-submenu :index="item.path" :key="item.title" v-if="item.children.length > 0">
                <template slot="title">
                <i v-if="item.icon" class="{item.icon + 'el-icon-'}" />
                <span>{{item.name}}</span>
                <router-link :to="item.path" @click.native="handleClick(item)">
                    <i v-if="item.icon" v-bind:class="'el-icon-' + item.icon" />
                    <span>{{item.title}}</span>
                </router-link>
                </template>
                <template v-for="child in item.children">
                <el-menu-item :index="child.path" :key="child.title">
                    <i v-if="child.icon" class="el-icon-{child.icon}" />
                    <span>{{child.title}}</span>
                    <router-link :to="child.path" @click.native="handleClick(child)">
                        <i v-if="child.icon" v-bind:class="'el-icon-' + child.icon" />
                        <span>{{child.title}}</span>
                    </router-link>
                </el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item v-else :index="item.path" :key="item.title">
                <router-link :to="item.path" @click.native="handleClick(item)">
                    <i v-if="item.icon" v-bind:class="'el-icon-' + item.icon" />
                    <span>{{item.title}}</span>
                </router-link>
            </el-menu-item>
            </template>
        </el-menu>
    </el-aside>
</template>

<script>

export default {
  name: 'navmenu',
  data () {
    return {
      menus: [],
      openMenu: [],
      isCollapse: false
    }
  },
  methods: {
    handleClick (obj) {
      this.$emit('menuClick', obj)
    }
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
