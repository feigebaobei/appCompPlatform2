<template>
  <div>
    <Layout>
      <Content>
        <!-- 没有面包屑 -->
        <Card>
          <!-- <Header class="title" theme="light">
            <Row>
              <Col span="12">
                <h1>我的应用</h1>
              </Col>
              <Col span="12" class="userbox">
                <Button @click="modalAddApp = true">添加应用</Button>
                <Modal v-model="modalAddApp" title="添加应用">
                  <Form ref="formDataAddApp" :model="formDataAddApp" :rules="formRuleAddApp" :label-width="80">
                    <FormItem label="应用名称" prop="name">
                      <Input v-model="formDataAddApp.name" type="text"></Input>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" @click="handleSubmitAddApp('formDataAddApp')">Submit</Button>
                      <Button type="ghost" @click="handleResetAddApp('formDataAddApp')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                  </Form>
                </Modal>
              </Col>
            </Row>
          </Header> -->
          <!-- 我的应用 start -->
          <applistvue>
            <!-- 我的应用的头部 -->
            <Header class="title" theme="light" slot="headerMy">
              <Row>
                <Col span="12">
                  <h1>我的应用</h1>
                </Col>
                <Col span="12" class="userbox">
                  <Button @click="modalAddApp = true">添加应用</Button>
                  <Modal v-model="modalAddApp" title="添加应用">
                    <Form ref="formDataAddApp" :model="formDataAddApp" :rules="formRuleAddApp" :label-width="80">
                      <FormItem label="应用名称" prop="name">
                        <Input v-model="formDataAddApp.name" type="text" placeholder="请输入应用名称"></Input>
                      </FormItem>
                      <FormItem label="描述" prop="describe">
                        <Input v-model="formDataAddApp.describe" type="text" placeholder="请输入描述"></Input>
                      </FormItem>
                      <FormItem label="所属部门" prop="department">
                        <Input v-model="formDataAddApp.department" type="text" placeholder="请输入所属部门"></Input>
                      </FormItem>
                      <FormItem label="所属域" prop="domain">
                        <Input v-model="formDataAddApp.domain" type="text" placeholder="请输入所属域"></Input>
                      </FormItem>
                      <FormItem label="仓库地址" prop="repository">
                        <Input v-model="formDataAddApp.repository" type="text" placeholder="请输入仓库地址"></Input>
                      </FormItem>
                      <FormItem label="WIKI地址" prop="wiki">
                        <Input v-model="formDataAddApp.wiki" type="text" placeholder="请输入WIKI地址"></Input>
                      </FormItem>
                      <FormItem label="申请原因" prop="reason">
                        <Input v-model="formDataAddApp.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入添加应用的原理。。。"></Input>
                      </FormItem>
                      <FormItem>
                        <Button type="primary" @click="handleSubmitAddApp('formDataAddApp')">Submit</Button>
                        <Button type="ghost" @click="handleResetAddApp('formDataAddApp')" style="margin-left: 8px">Reset</Button>
                      </FormItem>
                    </Form>
                    <div slot="footer"></div>
                  </Modal>
                </Col>
              </Row>
            </Header>
            <!-- 其它应用的头部 -->
            <Header class="title" theme="light" slot="headerElse">
              <Row>
                <Col span="12">
                  <h1>其它应用</h1>
                </Col>
              </Row>
            </Header>
            <!-- <apppanelvue v-for="item in responseMyApp.data.data"></apppanelvue> -->
          </applistvue>
          <!-- 我的应用 end -->
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
import applistvue from './applistvue.vue'
export default {
  name: 'managevue',
  data () {
    return {
      /* add app start */
      modalAddApp: false,
      formDataAddApp: {
        name: '',
        describe: '',
        department: '',
        domain: '',
        repository: '',
        wiki: '',
        reason: ''
      },
      formRuleAddApp: {
        name: [
          {required: true, message: '请输入应用名称', trigger: 'change'}
        ],
        describe: [
          {required: true, message: '请输入描述', trigger: 'change'}
        ],
        department: [
          {required: true, message: '请输入所属部门', trigger: 'change'}
        ],
        domain: [
          {required: true, message: '请输入所属域', trigger: 'change'}
        ],
        repository: [
          {required: true, message: '请输入仓库地址', trigger: 'change'}
        ],
        wiki: [
          {required: true, message: '请输入WIKI地址', trigger: 'change'}
        ],
        reason: [
          {required: true, message: '请输入添加应用的原理', trigger: 'change'}
        ]
      }
    }
  },
  components: {
    applistvue
  },
  computed: {},
  methods: {
    /* 添加应用 start */
    handleSubmitAddApp (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!')
          this.modalAddApp = false
          // 这个接口会出错，后端正在调整。
          this.$axios({
            method: 'post',
            url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps',
            data: this.qs.stringify({
              // app_id: '',
              // app_key: '',
              name: this.formDataAddApp.name,
              // type: '',
              desc: this.formDataAddApp.describe,
              domain: this.formDataAddApp.domain,
              wiki_url: this.formDataAddApp.wiki,
              repo_url: this.formDataAddApp.repository,
              creator_id: this.$store.getters.getUserInfo.uid,
              group_id: this.formDataAddApp.department,
              status: ''
            })
          }).then(response => {
            console.log(response)
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
          })
        } else {
          this.$Message.error('不可为空!')
        }
      })
    },
    handleResetAddApp (name) {
      this.$refs[name].resetFields()
    },
    /* 添加应用 end */
    // 回馈提交状态
    feedbackFormStatus (bool) {
      if (bool) {
        this.$Message.success('操作成功！')
      } else {
        this.$Message.error('操作失败！')
      }
    }
  },
  mounted () {
    // console.log(this.userInfo)
    // console.log(this.userInfo.uid)
    // var userInfo = this.$store.getters.getUserInfo
    // console.log(userInfo)
    // if (userInfo.uid !== '') {
    //   console.log(this.userInfo.uid)
    //   // this.requestMyApp()
    //   // this.requestAlseApp()
    // }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
  color: #495060;
  background: #fff;
  padding: 0;
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
