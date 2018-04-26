<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <!-- <layoutvue></layoutvue> -->
    <!-- <headervue></headervue> -->
    <layout>
      <!-- 头部 start -->
      <Header theme="dark" class="title">
        <Row>
          <Col span="8">
            <h1>应用管理后台</h1>
          </Col>
          <Col span="8" offset='8' class="userbox">
            <img src="../static/images/food.jpg" alt="头像" class="headPhoto">
            <Dropdown style="margin-left: 20px" placement="bottom-end" class="user">
                <a href="javascript:void(0)" style="color: #fff">
                    菜单(右)
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>quit</DropdownItem>
                </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <!-- 头部 end -->

      <layout>
        <!-- 导航 start -->
        <Sider :style="{height: '100vh', left: 0, overflow: 'auto', background: '#fff'}" class="aside">
            <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
              <router-link to="/appManage">
                <MenuItem name="1-1">
                  <Icon type="ios-navigate"></Icon>
                  <span>应用管理</span>
                </MenuItem>
              </router-link>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        实例管理
                    </template>
                    <router-link to="/list"><MenuItem name="2-1">实例列表</MenuItem></router-link>
                    <router-link to="/audit"><MenuItem name="2-2">实例审核</MenuItem></router-link>
                </Submenu>
            </Menu>
        </Sider>
        <!-- 导航 end -->

        <!-- main start -->
        <Layout :style="{padding: '0 24px 24px'}">
          <router-view>
            <!-- <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Components</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                Content
            </Content> -->
          </router-view>
        </Layout>
        <!-- main end -->
      </layout>
    </layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    // headervue
  },
  computed: {

  }
}
</script>

<style lang="scss">
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
