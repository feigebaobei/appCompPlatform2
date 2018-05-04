<template>
  <div>
    <Layout >
      <Content>
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>主页</BreadcrumbItem>
          <BreadcrumbItem>我的应用</BreadcrumbItem>
          <BreadcrumbItem>学习中心</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <Header class="title" theme="light">
            <Row>
              <Col span="11">
                <h1>学习中心概况</h1>
              </Col>
              <Col span="13" class="userbox">
                <!-- <Button type="primary">上线发布</Button> -->
                <Button type="primary" @click="modalComponents = true">添加应用</Button>
                <Modal v-model="modalComponents" title="添加应用组件" @on-ok="okComponent" @on-cancel="cancelComponent">
                  <Form ref="formDataComponent" :model="formDataComponent" :rules="formruleComponent" :label-width="100">
                    <FormItem label="添加应用组件" prop="select">
                      <Select v-model="formDataComponent.select" placeholder="请选择组件类型">
                        <Option value="beijing">Redis</Option>
                        <Option value="shanghai">kafka</Option>
                        <Option value="shangxian">上线发布</Option>
                      </Select>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" @click="handleSubmitComponent('formDataComponent')">Submit</Button>
                      <Button type="ghost" @click="handleResetComponent('formDataComponent')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                  </Form>
                  <div slot="footer"></div>
                </Modal>
                <Button type="primary" @click="modalMoniter = true">权限管理</Button>
                <Modal v-model="modalMoniter" title="权限管理" @on-ok="okMoniter" @on-cancel="cancelMoniter">
                  <Form ref="formDataMoniter" :model="formDataMoniter" :rules="formruleMoniter" :label-width="100">
                    <FormItem label="选择权限" prop="select">
                      <Select v-model="formDataMoniter.select" placeholder="请选择权限种类">
                        <Option value="moniter">管理员</Option>
                        <Option value="handler">操作人员</Option>
                        <Option value="audience">查看人员</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="用户ID" prop="id">
                      <Input v-model="formDataMoniter.id" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请用英文逗号分隔。如：1001,1002,1003"></Input>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" @click="handleSubmitMoniter('formDataMoniter')">Submit</Button>
                      <Button type="ghost" @click="handleResetMoniter('formDataMoniter')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                  </Form>
                  <div slot="footer"></div>
                </Modal>
              </Col>
            </Row>
          </Header>
          <!-- 详情 start -->
          <div class="detail">
            <!-- 应当对返回的数据的状态字段做判断。可是现在接口里没有这个字段，只能直接输出了。 -->
            <Row style="margin: 10px 0;">
              <Col span='4'>应用描述</Col>
              <Col span='20' v-html="responseOverview.data.data.desc"></Col>
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>所属部门</Col>
              <Col span='8' v-html="responseOverview.data.data.department_name"></Col>
              <Col span='4'>域名</Col>
              <Col span='8' v-html="responseOverview.data.data.domain"></Col>
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>仓库地址</Col>
              <Col span='8' v-html="responseOverview.data.data.repo_url"></Col>
              <Col span='4'>wiki地址</Col>
              <Col span='8' v-html="responseOverview.data.data.wiki_url"></Col>
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>管理员</Col>
              <Col span='20' v-html="responseOverview.data.data.admin_name"></Col>
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>创建时间</Col>
              <Col span='20' v-html="responseOverview.data.data.created_time"></Col>
            </Row>
          </div>
          <!-- 详情 end -->
          <hr class='hr'>
          <!-- redis start -->
          <Row class="redis">
            <Col span="4" class="left">
              <h2>Redis概况</h2>
              <Button class="button" @click="modalInstance = true">添加实例</Button>
              <Modal v-model="modalInstance" title="添加实例" @on-ok="okInstance" @on-cancel="cancelInstance">
                  <Form ref="formDataAddInstance" :model="formDataAddInstance" :rules="formruleInstance" :label-width="100">
                    <FormItem label="实例名称" prop="name">
                      <Input type="text" v-model="formDataAddInstance.name"></Input>
                    </FormItem>
                    <FormItem label="申请事由" prop="reason">
                      <Input v-model="formDataAddInstance.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入事由"></Input>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" @click="handleSubmitAddInstance('formDataAddInstance')">Submit</Button>
                      <Button type="ghost" @click="handleResetAddInstance('formDataAddInstance')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                  </Form>
                  <div slot="footer"></div>
                </Modal>
              <br>
              <a href="./moniter.html">
                <Button class="button">性能监控</Button>
              </a>
            </Col>
            <Col span="20">
              <Table height="600" border :data="tableData" :columns="tabelColumns"></Table>
              <!-- <a href="./instanceDetail.html?id=3">实例详情</a> -->
            </Col>
          </Row>
          <!-- redis end -->
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'appDetailCont',
  data: function () {
    return {
      /* add component start */
      modalComponents: false,
      formDataComponent: {
        select: ''
      },
      formruleComponent: {
        select: [
          {required: true, message: '请选择组件类型', trigger: 'change'}
        ]
      },
      /* add component end */
      // moniter start
      modalMoniter: false,
      formDataMoniter: {
        select: '',
        id: ''
      },
      formruleMoniter: {
        select: [
          {required: true, message: '请选择组件类型', trigger: 'change'}
        ],
        id: [
          {required: true, message: '请按格式输入', trigger: 'blur'}
        ]
      },
      // moniter end
      // add instance start
      modalInstance: false,
      formDataAddInstance: {
        name: '',
        reason: ''
      },
      formruleInstance: {
        name: [
          {required: true, message: '请输入实例名称', trigger: 'change'}
        ],
        reason: [
          {required: true, message: '请输入事由', trigger: 'change'}
        ]
      },
      // add instance end
      // responseOverview: {
      //   data: {
      //     data: {
      //       name: 'sss'
      //     },
      //     message: '',
      //     status: ''
      //   },
      //   status: ''
      // },
      responseOverviewTemp: {
        data: {
          data: {
            name: 'sss'
          },
          message: '',
          status: ''
        },
        status: ''
      },
      responseInstanceList: {
        data: {
          data: {},
          message: '',
          status: ''
        },
        status: ''
      },
      tabelColumns: [
        {
          title: 'id',
          key: 'id',
          fixed: 'left',
          width: 70,
          sortable: true,
          // sortMethod: function (a, b, type) {}, 自定义排序方法。
          sortType: 'desc'
        },
        {
          title: 'ip',
          key: 'ip',
          fixed: 'left',
          width: 120
        },
        {
          title: 'port',
          key: 'port',
          fixed: 'left',
          width: 70
        },
        {
          title: 'cpu',
          // key: 'cpu',
          children: [
            {
              title: '峰值',
              key: 'cpuPeak',
              width: 70,
              sortable: true,
              filters: [
                {
                  label: '50%以下',
                  value: 1
                },
                {
                  label: '50%~80%',
                  value: 2
                },
                {
                  label: '80%以上',
                  value: 3
                }
              ],
              filterMultiple: false,
              filterMethod (value, row) {
                var sum = row.cpuPeak.slice(0, row.cpuPeak.length - 1)
                switch (value) {
                  case 1:
                    return sum < 50
                  case 2:
                    return sum >= 50 && sum < 80
                  case 3:
                    return sum >= 80
                }
              }
            },
            {
              title: '实时',
              key: 'cpuReal',
              width: 70,
              sortable: true,
              filters: [
                {
                  label: '50%以下',
                  value: 1
                },
                {
                  label: '50%~80%',
                  value: 2
                },
                {
                  label: '80%以上',
                  value: 3
                }
              ],
              filterMultiple: false,
              filterMethod (value, row) {
                var sum = row.cpuReal.slice(0, row.cpuReal.length - 1)
                switch (value) {
                  case 1:
                    return sum < 50
                  case 2:
                    return sum >= 50 && sum < 80
                  case 3:
                    return sum >= 80
                }
              }
            },
            {
              title: '阈值',
              key: 'cpuThreshold',
              width: 70,
              sortable: true
            }
          ]
        },
        {
          title: 'ops',
          // key: 'ops',
          children: [
            {
              title: '峰值',
              key: 'opsPeak',
              width: 70,
              sortable: true,
              filters: [
                {
                  label: '50%以下',
                  value: 1
                },
                {
                  label: '50%~80%',
                  value: 2
                },
                {
                  label: '80%以上',
                  value: 3
                }
              ],
              filterMultiple: false,
              filterMethod (value, row) {
                var sum = row.cpuPeak.slice(0, row.cpuPeak.length - 1)
                switch (value) {
                  case 1:
                    return sum < 50
                  case 2:
                    return sum >= 50 && sum < 80
                  case 3:
                    return sum >= 80
                }
              }
            },
            {
              title: '实时',
              key: 'opsReal',
              width: 70,
              sortable: true,
              filters: [
                {
                  label: '50%以下',
                  value: 1
                },
                {
                  label: '50%~80%',
                  value: 2
                },
                {
                  label: '80%以上',
                  value: 3
                }
              ],
              filterMultiple: false,
              filterMethod (value, row) {
                var sum = row.cpuReal.slice(0, row.cpuReal.length - 1)
                switch (value) {
                  case 1:
                    return sum < 50
                  case 2:
                    return sum >= 50 && sum < 80
                  case 3:
                    return sum >= 80
                }
              }
            },
            {
              title: '阈值',
              key: 'opsThreshold',
              width: 70,
              sortable: true
            }
          ]
        },
        {
          title: '连接数',
          // key: 'connect',
          children: [
            {
              title: '峰值',
              key: 'connectPeak',
              width: 70,
              sortable: true,
              filters: [
                {
                  label: '50%以下',
                  value: 1
                },
                {
                  label: '50%~80%',
                  value: 2
                },
                {
                  label: '80%以上',
                  value: 3
                }
              ],
              filterMultiple: false,
              filterMethod (value, row) {
                var sum = row.cpuPeak.slice(0, row.cpuPeak.length - 1)
                switch (value) {
                  case 1:
                    return sum < 50
                  case 2:
                    return sum >= 50 && sum < 80
                  case 3:
                    return sum >= 80
                }
              }
            },
            {
              title: '实时',
              key: 'connectReal',
              width: 70,
              sortable: true,
              filters: [
                {
                  label: '50%以下',
                  value: 1
                },
                {
                  label: '50%~80%',
                  value: 2
                },
                {
                  label: '80%以上',
                  value: 3
                }
              ],
              filterMultiple: false,
              filterMethod (value, row) {
                var sum = row.cpuReal.slice(0, row.cpuReal.length - 1)
                switch (value) {
                  case 1:
                    return sum < 50
                  case 2:
                    return sum >= 50 && sum < 80
                  case 3:
                    return sum >= 80
                }
              }
            },
            {
              title: '阈值',
              key: 'connectThreshold',
              width: 70,
              sortable: true
            }
          ]
        },
        {
          title: '状态',
          key: 'status',
          fixed: 'right',
          width: 70
        },
        {
          title: '操作',
          key: '',
          fixed: 'right',
          width: 120,
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: './instanceDetail.html?id=' + params.row.id
              }
            }, '实例详情')
          }
        }
      ]
      /* table end */
    }
  },
  components: {},
  computed: {
    responseOverview: {
      set (data) {
        // console.log(data)
        this.responseOverviewTemp = data
      },
      get () {
        return this.responseOverviewTemp
      }
    },
    tableData: {
      set: function (data) {},
      get: function () {
        var result = []
        var data = this.responseInstanceList.data.data // array
        for (var i = 0, iLen = data.length; i < iLen; i++) {
          var obj = {}
          obj.id = data[i].id
          obj.ip = data[i].master_ip
          obj.port = data[i].port
          obj.cpuPeak = data[i].cpu_info.peak
          obj.cpuReal = data[i].cpu_info.real
          obj.cpuThreshold = data[i].cpu_info.threshold
          obj.opsPeak = data[i].ops_info.peak
          obj.opsReal = data[i].ops_info.real
          obj.opsThreshold = data[i].ops_info.threshold
          obj.connectPeak = data[i].conn_info.peak
          obj.connectReal = data[i].conn_info.real
          obj.connectThreshold = data[i].conn_info.threshold
          obj.status = data[i].status
          result.push(obj)
        }
        return result
      }
    }
  },
  methods: {
    okComponent () {},
    cancelComponent () {},
    okMoniter () {},
    cancelMoniter () {},
    okInstance () {},
    cancelInstance () {},
    // 添加应用 start
    handleSubmitComponent (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!')
          this.modalComponents = false
          // console.log(this.response.data.data.id)
          // console.log(this.formData.select)
          // 这个接口会出错，后端正在调整。
          this.$axios({
            method: 'post',
            url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/app-components',
            data: {
              app_id: this.responseOverview.data.data.id
            }
          }).then(response => {
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
    handleResetComponent (name) {
      this.$refs[name].resetFields()
    },
    // 添加应用 end
    /* moniter start */
    handleSubmitMoniter (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/privileges',
            data: {
              app_id: this.responseOverview.data.data.id,
              role_id: this.formDataMoniter.select,
              user_ids: this.formDataMoniter.id
            }
          }).then(response => {
            console.log(response)
            this.modalMoniter = false
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
          })
        } else {
          this.$Message.error('不可为空')
        }
      })
    },
    handleResetMoniter (name) {
      this.$refs[name].resetFields()
    },
    /* moniter end */
    /* add instance start */
    handleSubmitAddInstance (name) {
      // 这个接口也是错的。我用ajax测试也得不到正确数据。
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://www.cloud.com/redis/mock/add',
            data: this.qs.stringify({
              name: this.formDataAddInstance.name,
              remark: this.formDataAddInstance.reason,
              application_id: this.responseOverview.data.data.id
            })
          }).then(response => {
            console.log(response)
            this.modalInstance = false
            this.feedbackFormStatus(response.status === 200 && response.data.message === 'success')
          })
          // this.$axios.post(
          //   'http://www.cloud.com/redis/mock/add',
          //   this.qs.stringify({
          //     name: this.formDataAddInstance.name,
          //     remark: this.formDataAddInstance.reason,
          //     application_id: 1// 先写死
          //   })
          // ).then(response => {
          //   console.log(response)
          // }).catch(error => {
          //   console.log(error)
          // })
        } else {
          this.$Message.error('不可为空')
        }
      })
    },
    handleResetAddInstance (name) {
      this.$refs[name].resetFields()
    },
    /* add instance end */
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
    // this.$axios.get(
    //   'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps/1',
    //   this.qs.stringify({
    //     app_id: 1// 需要得到相应的id
    //   })
    //   ).then(response => {
    //   this.response = response
    // })
    // 请求详情的数据
    this.$axios({
      method: 'get',
      url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps/1'
      // url: 'http://www.cloud.com/redis/mock/detail/id/36'
    }).then(response => {
      // console.log(response)
      // this.responseOverview = response
      this.responseOverview = response
    }).catch(error => {
      console.log(error)
    })
    // 请求表格的数据
    this.$axios({
      method: 'get',
      url: 'http://www.cloud.com/redis/mock/list/id/1'
    }).then(response => {
      // console.log(response)
      this.responseInstanceList = response
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
.redis {
  .left {
    .button {
      margin: 15px 0 0 0;
    }
  }
}
</style>
