<template>
  <div id="auditList">
    <layoutvue :nav="auditList"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../components/layoutvue.vue'
export default {
  name: 'auditList',
  data () {
    return {
      modal1: false,
      imgUrl: './static/images/food.jpg',
      auditList: 'auditList'
    }
  },
  components: {
    layoutvue
  },
  methods: {
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
