<template>
  <div id="appDetail">
    <layoutvue :nav="appDetail"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../components/layoutvue.vue'
export default {
  name: 'appDetail',
  data () {
    return {
      modal1: false,
      imgUrl: './static/images/food.jpg',
      appDetail: 'appDetail'
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
.title {
  text-align: left;
  color: #eee;
  h1 {
    display: inline;
  }
  .userbox {
    text-align: right;
    font-size: 16px;
    .headPhoto {
      width: 50px;
      height: 50px;
      border-radius: 26px;
      margin: 5px;
      vertical-align: middle;
    }
    .user {
      vertical-align: middle;
    }
  }
}
</style>
