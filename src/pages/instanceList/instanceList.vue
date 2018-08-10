<template>
  <div id="instanceList">
    <layoutvue :nav="instanceList"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../components/layoutvue.vue'
export default {
  name: 'instanceList',
  data () {
    return {
      modal1: false,
      imgUrl: './static/images/food.jpg',
      instanceList: 'instanceList'
    }
  },
  components: {
    layoutvue
  },
  methods: {
    ok () {
      // this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>

<style  lang="scss">
html, body, #app {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
