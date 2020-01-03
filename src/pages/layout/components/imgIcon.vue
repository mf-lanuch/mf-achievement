<template>
  <img :src="url">
</template>
<script>

export default {
  name: 'svgIcon',
  props: {
    path: {
      required: true
    }
  },
  data () {
    return {
      url: require('../../../assets/index/' + this.path + '.png')
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/layout/layout.scss";
</style>
