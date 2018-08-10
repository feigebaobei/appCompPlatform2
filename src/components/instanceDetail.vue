<template>
  <div>
    <Layout>
      <Content>
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>主页</BreadcrumbItem>
          <BreadcrumbItem>我的应用</BreadcrumbItem>
          <BreadcrumbItem>学习中心</BreadcrumbItem>
          <BreadcrumbItem>实例详情</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <Header class="title" theme="light">
            <Row>
              <Col span="11">
                <h1>实例详情</h1>
              </Col>
            </Row>
          </Header>
          <!-- 详情 start -->
          <div class="detail">
            <!-- 应当对返回的数据的状态字段做判断。可是现在接口里没有这个字段，只能直接输出了。 -->
            <Row style="margin: 10px 0;">
              <Col span='4'>实例名称</Col>
              <Col span='8' v-html="responseDetail.data.data.name"></Col>
              <Col span='4'>CPU核数</Col>
              <Col span='8' v-html="responseDetail.data.data.cpu_kernel"></Col>
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>实例ip</Col>
              <Col span='8' v-html="responseDetail.data.data.vip"></Col>
              <Col span='4'>CPU核序号</Col>
              <Col span='8' v-html="responseDetail.data.data.bind_cpu"></Col>
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>实例状态</Col>
              <Col span='8' v-html="responseDetail.data.data.status"></Col>
              <Col span='4'>内存</Col>
              <Col span='8' v-html="mem"></Col>
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>申请人</Col>
              <Col span='8' v-html="responseDetail.data.data.proposer"></Col>
              <Col span='4'>硬盘</Col>
              <Col span='8' v-html="responseDetail.data.data.disk"></Col>
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>创建时间</Col>
              <Col span='8' v-html="responseDetail.data.data.create_time"></Col>
              <Col span='4'>最大连接数</Col>
              <Col span='8' v-html="responseDetail.data.data.max_conn"></Col>
            </Row>
          </div>
          <!-- 详情 end -->
          <!-- 表格 start -->
          <div>
            <Row :gutter="15">
              <Col span="20">
                <Table border :data='tableDetailData' :columns="tableDetailColumns"></Table>
              </Col>
              <Col span="4">
                <Button @click="modalDilatation = true">申请扩容</Button>
                <Modal v-model="modalDilatation" title="申请扩容">
                  <Form ref="formDataDilatation" :model="formDataDilatation" :rules="formRuleDilatation" :label-width="80">
                    <FormItem label="申请事由" prop="reason">
                      <Input v-model="formDataDilatation.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入扩容事由"></Input>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" @click="handleSubmitDilatation('formDataDilatation')">Submit</Button>
                      <Button type="ghost" @click="handleResetDilatation('formDataDilatation')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                  </Form>
                  <div slot="footer"></div>
                </Modal>
              </Col>
            </Row>
          </div>
          <!-- 表格 end -->
          <hr class="hr">
          <!-- 告警 start -->
          <div>
            <Header class="title" theme="light">
              <Row>
                <Col span="11">
                  <h1>告警策略</h1>
                </Col>
              </Row>
            </Header>
            <Table style="margin: 5px 0 0 0;" border :data="tableAlertData" :columns="tableAlertColumns"></Table>
            <!-- test -->
            <Button @click="modalAlert = true">修改告警</Button>
            <Modal v-model="modalAlert" title="修改告警">
              <Form ref="formDataAlert" :model="formDataAlert" :rules="formRuleAlert" :label-width="80">
                <FormItem label="触发类型" prop="type">
                  <span>CPU</span>
                </FormItem>
                <FormItem label="阈值" prop="threshold">
                  <Input type="text" v-model="formDataAlert.threshold"></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmitAlert('formDataAlert')">Submit</Button>
                  <Button type="ghost" @click="handleResetAlert('formDataAlert')" style="margin-left: 8px">Reset</Button>
                </FormItem>
              </Form>
            </Modal>
          </div>
          <!-- 告警 end -->
          <hr class="hr">
          <!-- 备份 start -->
          <div>
            <Header class="title" theme="light">
              <Row>
                <Col span="11">
                  <h1>备份</h1>
                </Col>
              </Row>
            </Header>
            <Row style="margin: 5px 0 0 0;">
              <Col span="12">
                <p>上次备份时间： 2018.04.20 20:00:27</p>
              </Col>
              <Col span="12">
                <p>下次备份时间： 2018.04.27 20:00:27</p>
              </Col>
            </Row>
          </div>
          <!-- 备份 end -->
        </Card>
      </Content>
    </Layout>

  </div>
</template>

<script>
export default {
  name: 'instanceDetail',
  data: function () {
    return {
      /* dilatation start */
      modalDilatation: false,
      formDataDilatation: {
        reason: ''
      },
      formRuleDilatation: {
        reason: [
          {required: true, message: '扩容事由不能为空', trigger: 'blur'}
        ]
      },
      /* dilatation end */
      /* modalAlert start */
      modalAlert: false,
      formDataAlert: {
        threshold: ''
      },
      formRuleAlert: {
        threshold: [
          {required: true, message: '请输入阈值', trigger: 'change'}
        ]
      },
      responseAlert: {
        data: {
          data: {},
          message: '',
          status: ''
        },
        status: ''
      },
      tableAlertColumns: [
        {
          title: ''
        }
      ],
      /* modalAlert end */
      /* 实例详情 start */
      responseDetail: {
        data: {
          data: {},
          message: '',
          status: ''
        },
        status: ''
      },
      tableDetailColumns: [
        {
          title: 'id',
          key: 'id',
          width: 70,
          sortable: true
        },
        {
          title: 'ip',
          key: 'ip',
          width: 120
        },
        {
          title: '操作员',
          key: 'operator'
        },
        {
          title: '操作时间',
          key: 'operator_time'
        }
      ]
      /* 实例详情 end */
    }
  },
  computed: {
    // 应用id
    appId: function () {
      var href = window.location.href
      var reg = /\?id=(\d)*#\//
      var resultArr = reg.exec(href)
      var idStr = resultArr[0]
      var id = idStr.slice(4, -2)
      // console.log(id)
      return id
    },
    // 内存
    mem: {
      set () {},
      get () {
        return this.responseDetail.data.data.mem + 'G'
      }
    },
    // 详情表格的数据
    tableDetailData: {
      set () {},
      get () {
        var result = []
        var data = this.responseDetail.data.data.slave_info
        if (!data) { return }
        for (var i = 0, iLen = data.length; i < iLen; i++) {
          var obj = {}
          obj.id = data[i].id
          obj.ip = data[i].ip
          obj.operator = data[i].operator
          obj.operator_time = data[i].operator_time
          result.push(obj)
        }
        return result
      }
    },
    // 告警策略表格的数据
    tableAlertData: {
      set () {},
      get () {
        var result = []
        return result
      }
    }
  },
  methods: {
    /* dilatation start */
    handleSubmitDilatation (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios.post(
            // 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/redis-instance/expand',
            // 'http://www.cloud.com/redis/mock/expand/id/36',
            'http://10.99.1.135/redis/mock/expand',
            this.qs.stringify({
              id: 36,
              remark: this.formDataDilatation.reason
            })
          ).then(response => {
            this.modalDilatation = false
            console.log(response)
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$Message.error('不可为空!')
        }
      })
    },
    handleResetDilatation (name) {
      this.$refs[name].resetFields()
    },
    /* dilatation end */
    /* moniter start */
    handleSubmitAlert (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modalAlert = false
          this.$axios({
            method: 'post',
            url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/privileges/app',
            data: {
              user_ids: this.formDataMoniter
              // app_id: this.
            }
          }).then(response => {
            console.log(response)
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
          })
        } else {
          this.$Message.error('不可为空')
        }
      })
    },
    handleResetAlert (name) {
      this.$refs[name].resetFields()
    },
    /* moniter end */
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
    // 请求实例详情数据
    this.$axios({
      method: 'get',
      url: 'http://www.cloud.com/redis/mock/detail/id/36'
    }).then(response => {
      // console.log(response)
      this.responseDetail = response
      // response 里包括字段数据、表格数据。需要分别处理。
    }).catch(error => {
      console.log(error)
    })
    // 请求告警策略表格数据
    this.$axios.get(
      'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/redis-alarm/list',
      {
        params: {
          id: 1,
          instance_id: 1,
          application_id: 1,
          name: 1,
          condition: 1,
          status: 1,
          operator: 1
        }
      }
    ).then(response => {
      console.log(response)
      this.responseAlert = response
    }).catch(error => {
      console.log(error)
    })
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
.detail {
  margin: 5px 0 0 0;
  padding: 0 10px;
}
.hr {
  margin: 20px 0;
}
</style>
