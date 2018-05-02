<template>
  <div class="layout">
    <layout>
      <!-- 头部 start -->
      <Header theme="dark" class="title">
        <Row>
          <Col span="8">
            <h1>应用管理后台</h1>
          </Col>
          <Col span="8" offset='8' class="userbox">
            <img :src="imgUrl" alt="头像" class="headPhoto">
            <Dropdown style="margin-left: 20px" placement="bottom-end" class="user">
                <a href="javascript:void(0)" style="color: #fff">
                    <!-- 姓名 -->
                    {{userInfo.name}}
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>退出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <!-- 头部 end -->

      <layout>
        <!-- 导航 start -->
        <Sider :style="{height: '100vh', left: 0, overflow: 'auto', background: '#fff'}" class="aside">
            <Menu :active-name="curSelectedNav" theme="light" width="auto" :open-names="openSider">
              <!-- <a href="./index.html">
                <MenuItem name="1-1">
                  <Icon type="ios-navigate"></Icon>
                  <span>应用管理</span>
                </MenuItem>
              </a>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  实例管理
                </template>
                <a href="./instanceList.html"><MenuItem name="2-1">实例列表</MenuItem></a>
                <a href="./auditList.html"><MenuItem name="2-2">审核列表</MenuItem></a>
              </Submenu> -->
              <a href="./index.html" style="color: #333">
                <MenuItem name="1-1">
                  <Icon type="ios-navigate"></Icon>
                  <span v-html='responseSider.data.data[0].name'></span>
                </MenuItem>
              </a>
              <Submenu name="2">
                <!-- <template slot="title" v-html='sider[0].name'> -->
                <!-- <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  {{responseSider.data.data[1].name}}
                </template> -->
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  {{responseSider.data.data[1].name}}
                </template>
                <a href="./instanceList.html" style="color: #333"><MenuItem name="2-1" v-html='responseSider.data.data[1].child[0].name'></MenuItem></a>
                <a href="./auditList.html" style="color: #333"><MenuItem name="2-2" v-html='responseSider.data.data[1].child[1].name'></MenuItem></a>
              </Submenu>
            </Menu>
        </Sider>
        <!-- <sidervue :curSelectedNav="curSelectedNav"></sidervue> -->
        <!-- 导航 end -->

        <!-- main start -->
        <Layout :style="{padding: '0 24px 24px'}">
          <!-- <router-view> -->
            <!-- <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Components</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                Content
            </Content> -->
          <!-- </router-view> -->
          <!-- 管理 start -->
          <managevue v-if="nav === 'manage'" :userInfo="userInfo"></managevue>
          <!-- 管理 end -->
          <!-- 应用详情 start -->
          <appDetailCont v-if="nav === 'appDetail'"></appDetailCont>
          <!-- 应用详情 end -->
          <!-- 实例详情 start -->
          <instanceDetail v-if="nav === 'instanceDetail'"></instanceDetail>
          <!-- 实例详情 end -->
          <!-- 监控 start -->
          <moniter v-if="nav === 'moniter'"></moniter>
          <!-- 监控 end -->
          <!-- 实例列表 start -->
          <instanceList v-if="nav === 'instanceList'"></instanceList>
          <!-- 实例列表 end -->
          <!-- 实例列表 start -->
          <auditList v-if="nav === 'auditList'"></auditList>
          <!-- 实例列表 end -->
          <!-- 实例列表 start -->
          <auditvue v-if="nav === 'audit'"></auditvue>
          <!-- 实例列表 end -->
        </Layout>
        <!-- main end -->
      </layout>
    </layout>
    </div>
</template>
<script>
// import sidervue from './sidervue.vue'
import managevue from './managevue.vue'
import appDetailCont from './appDetailCont.vue'
import instanceDetail from './instanceDetail.vue'
import moniter from './moniter.vue'
import instanceList from './instanceList.vue'
import auditList from './auditList.vue'
import auditvue from './auditvue.vue'
export default {
  name: 'layoutvue',
  props: ['nav'],
  data: function () {
    return {
      imgUrl: './static/images/food.jpg',
      curPage: '',
      /* 用户信息 start */
      userInfo: {
        name: '姓名',
        uid: ''
      },
      /* 用户信息 end */
      responseSider: {
        data: {
          data: [
            {
              name: ''
            },
            {
              name: '',
              child: [
                {
                  name: ''
                },
                {
                  name: ''
                }
              ]
            }
          ],
          message: '',
          status: ''
        },
        status: ''
      }
    }
  },
  components: {
    // sidervue,
    managevue,
    appDetailCont,
    instanceDetail,
    moniter,
    instanceList,
    auditList,
    auditvue
  },
  computed: {
    curSelectedNav: function () {
      // 其实用不到这个函数。nav 就可以指定当前页面
      switch (this.nav) {
        case 'manage':
        case 'appDetail':
        case 'instanceDetail':
        case 'moniter':
          return '1-1'
        case 'instanceList':
          return '2-1'
        case 'auditList':
        case 'audit':
          return '2-2'
        default:
          //
          break
      }
    },
    openSider () {
      var position = window.location.href
      // console.log(position)
      var reg = /\/(\w*)\.html/
      reg.test(position)
      var $1 = RegExp.$1
      // console.log($1)
      switch ($1) {
        case 'appDetail':
        case 'auditList':
        case 'instanceList':
          return ['2']
        default:
          return ['1']
      }
    }
    // responseSider () {
    //   data: {
    //     data: {},
    //     message: '',
    //     status: ''
    //   },
    //   status: ''
    // }
    // sider () {
    //   return [
    //     {
    //       name: responseSider.data.data[0].name,
    //       child: []
    //     },
    //     {
    //       name: responseSider.data.data[1].name,
    //       child: [
    //         {
    //           name: responseSider.data.data[1].child[0].name,
    //           child: []
    //         },
    //         {
    //           name: responseSider.data.data[1].child[1].name,
    //           child: []
    //         }
    //       ]
    //     }
    //   ]
    // }
  },
  methods: {
  },
  mounted () {
    /* 用户信息 start */
    this.$axios({
      method: 'post',
      url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/user'
    }).then(response => {
      // console.log(response)
      this.userInfo = response.data.data
    }).catch(error => {
      console.log(error)
    })
    /* 用户信息 end */
    /* 请求导航的数据 start */
    this.$axios({
      method: 'get',
      url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/menus'
    }).then(response => {
      // console.log(response)
      this.responseSider = response
    })
    /* 请求导航的数据 end */
  }
}

</script>
<style lang="scss" scoped>
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
