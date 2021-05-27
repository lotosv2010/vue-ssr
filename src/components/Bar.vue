<template>
  <div @click="show">
    bar
  </div>
</template>

<script>
  export default {
    methods: {
      show() {
        console.log('bar')
      }
    }
  }
</script>

<style scoped>

</style>