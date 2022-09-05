<template>
  <div>
    <h1>{{ message }} </h1>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  metaInfo: {
    title: '404' 
  },
  data() {
    return {
      message: 'Not Found'
    }
  }
}
</script>

<style scoped>
</style>