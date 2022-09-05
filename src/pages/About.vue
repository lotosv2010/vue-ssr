<template>
  <div>
    <h1>{{ message }} Me</h1>
  </div>
</template>

<script>
export default {
  name: 'About',
  metaInfo: {
    title: '关于' 
  },
  data() {
    return {
      message: 'About'
    }
  }
}
</script>

<style scoped>
</style>