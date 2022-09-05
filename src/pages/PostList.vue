<template>
  <div>
    <h1>Post List</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostList',
  metaInfo: {
    title: 'Posts'
  },
  data() {
    return {
      // posts: []
    }
  },
  // 服务端渲染
  // 		只支持 beforeCreate 和 created
  // 		不会等待 beforeCreate 和 created 中的异步操作
  // 		不支持响应式数据 
  // async created () {
  //   const { data } = await axios({
  //     method: 'GET',
  //     url: 'https://cnodejs.org/api/v1/topics'
  //   })
  //   this.posts = data.data
  // },
  mounted() {
    if (!this.posts.length) {
      this.$store.dispatch('getPosts')
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setPosts', [])
    next()
  },
  computed: {
    ...mapState(['posts'])
  },
  serverPrefetch() {
    return this.getPosts()
  },
  methods: {
    ...mapActions(['getPosts'])
  }
}
</script>

<style>
</style>
