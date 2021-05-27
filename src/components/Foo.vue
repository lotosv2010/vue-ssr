<template>
  <div class="foo">
    foo
    {{ this.$store.state.name }}
  </div>
</template>

<script>
export default {
  // mounted() {
  //   return this.$store.dispatch("changeName", 'hahha');
  // },
  asyncData(store) {
    return store.dispatch("changeName", 'test');
  }
}
</script>

<style scoped>
.foo {
  color: red;
}
</style>