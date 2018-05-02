<template>
  <div>
    appManage
    <a href="./appDetail.html">应用详情</a>
    <Layout>
      <Content>
        <!-- 没有面包屑 -->
        <Card>
          <Header class="title" theme="light">
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
          </Header>
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'managevue',
  props: ['userInfo'],
  data () {
    return {
      /* add app start */
      modalAddApp: false,
      formDataAddApp: {
        name: ''
      },
      formRuleAddApp: {
        name: [
          {required: true, message: '请输入应用名称', trigger: 'change'}
        ]
      }
      /* add app end */
    }
  },
  methods: {
    /* dilatation start */
    handleSubmitAddApp (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!')
          this.modalAddApp = false
          // 这个接口会出错，后端正在调整。
          this.$axios({
            methods: 'POST',
            url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/redis-instance/apply',
            data: {
              name: this.response.data.data.name,
              remark: this.formDataDilatation.reason
            }
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
    /* dilatation end */
    // 回馈提交状态
    feedbackFormStatus (bool) {
      if (bool) {
        this.$Message.success('操作成功！')
      } else {
        this.$Message.error('操作失败！')
      }
    },
    /* 请求我的应用的数据 start */
    requestMyApp () {
      this.$axios({
        method: 'get',
        url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps/mine',
        data: {
          uid: this.userInfo.uid,
          type: 0
        }
      }).then(response => {
        console.log(response)
      })
    },
    /* 请求我的应用的数据 end */
    /* 请求其他应用的数据 start */
    requestAlseApp () {
      this.$axios({
        method: 'get',
        url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps/mine',
        data: {
          uid: this.userInfo.uid,
          type: 1
        }
      }).then(response => {
        console.log(response)
      })
    }
    /* 请求其他应用的数据 end */
  },
  mounted () {
    if (this.userInfo.uid) {
      console.log(this.userInfo.uid)
      this.requestMyApp()
      this.requestAlseApp()
    }
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
