<template>
  <div>
    <!-- 这个组件需要在请求到用户信息后渲染应用列表。为了监听用户信息才这样做 start -->
    <div class="calcUserInfo" v-show="false">
      {{calcUserInfo}}
    </div>
    <!-- 这个组件需要在请求到用户信息后渲染应用列表。为了监听用户信息才这样做 end -->
    <div v-if="responseMyApp.data.data.length">
      <slot name="headerMy"></slot>
      <div class="applist">
        <apppanelvue v-for="item in responseMyApp.data.data" :item="item" :key="item.id"></apppanelvue>
        <div class="empty"></div><!-- 用来撑开父元素的高度 -->
      </div>
    </div>
    <hr class="hr" v-if="responseElseApp.data.data.length && responseMyApp.data.data.length">
    <div v-if="responseElseApp.data.data.length">
      <slot name="headerElse"></slot>
      <div class="applist">
        <apppanelvue v-for="item in responseElseApp.data.data" :item="item" :key="item.id"></apppanelvue>
        <div class="empty"></div><!-- 用来撑开父元素的高度 -->
      </div>
    </div>
    <!-- </Row> -->
  </div>
</template>

<script>
import apppanelvue from './apppanelvue.vue'
export default {
  name: 'applistvue',
  data () {
    return {
      // mes: 'ddd',
      /* add app end */
      /* 我的应用 start */
      responseMyApp: {
        data: {
          data: [],
          message: '',
          status: ''
        },
        status: {}
      },
      /* 我的应用 end */
      /* 我的应用 start */
      responseElseApp: {
        data: {
          data: [],
          message: '',
          status: ''
        },
        status: {}
      }
      /* 我的应用 end */}
  },
  components: {
    apppanelvue
  },
  computed: {
    calcUserInfo: function () {
      var userInfo = this.$store.getters.getUserInfo
      if (userInfo.status) {
        // console.log(userInfo.status)
        this.requestMyApp()
        this.requestElseApp()
        return ''
      }
    }
  },
  methods: {
    /* 请求我的应用的数据 start */
    requestMyApp () {
      // var uid = this.$store.getters.getUserInfo.uid
      this.$axios({
        method: 'get',
        url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps/mine',
        data: {
          // uid: this.userInfo.uid,
          uid: this.$store.getters.getUserInfo.uid,
          type: 0
        }
      }).then(response => {
        // console.log(response)
        // console.log(this)
        this.responseMyApp = response
        // this.$nextTick(function () {
        //   this.$el.textContent
        // })
      })
    },
    /* 请求我的应用的数据 end */
    /* 请求其他应用的数据 start */
    requestElseApp () {
      this.$axios({
        method: 'get',
        url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps/mine',
        data: {
          uid: this.$store.getters.getUserInfo.uid,
          type: 1
        }
      }).then(response => {
        // console.log(response)
        this.responseElseApp = response
        // this.responseElseApp.data.data.
        /* 上线前一定要删除 start */
        for (var i = 0, iLen = 3; i < iLen; i++) {
          this.responseElseApp.data.data[i].id += 3
        }
        /* 上线前一定要删除 end */
      })
    }
    /* 请求其他应用的数据 end */
  }
}
</script>

<style lang="scss" scoped>
.applist {
  text-align: left;
  margin: 5px 0 0 0;
}
.hr {
  margin: 15px 0;
}
.empty {
  clear: both;
}
</style>
