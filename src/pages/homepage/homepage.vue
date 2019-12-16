<template>
  <div id="container">
      首页
      <span @click="clickName">{{name}}</span>
      <el-input v-model.trim='name' placeholder='请输入查询姓名'></el-input>
  </div>
</template>

<script>

export default {
  name: 'homepage',
  data () {
    return {
      name: 'kxh'
    }
  },
  methods: {
    clickName () {
      console.log(this.name)
    }
  }
}
</script>

<style>
</style>
