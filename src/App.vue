<template>
  <div id="app">
    <header>
      <router-link to="/bar">bar</router-link>
      <router-link to="/foo">foo</router-link>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Bar from './components/Bar'
import Foo from './components/Foo'
export default {
  components: {
    Bar,
    Foo
  }
}
</script>

<style scoped>

</style>