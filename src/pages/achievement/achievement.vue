<template>
  <div id="container">
      绩效<el-input v-model.trim='psgName' placeholder='请输入查询姓名'></el-input>
      {{psgName}}
  </div>
</template>

<script>

export default {
  name: 'achievement',
  data () {
    return {
      psgName: undefined
    }
  }
}
</script>

<style>
</style>
