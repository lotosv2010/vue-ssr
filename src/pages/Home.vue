<template>
  <div>
    <h1>Hello {{ message }}！！</h1>
    <input v-model="message">
  </div>
</template>

<script>
export default {
  name: 'Home',
  metaInfo: {
    title: '首页' 
  },
  data() {
    return {
      message: 'World'
    }
  }
}
</script>

<style scoped>
</style>