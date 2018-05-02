<template>
  <div>
    <Layout>
      <Content>
        <Card>
          <Header class="title" theme="light">
            <Row>
              <Col span="11">
                <h1>实例列表</h1>
              </Col>
            </Row>
          </Header>
          <!-- 实例列表 start -->
          <div class="instanceList">
            <Table height="600" border :data="tableInstanceListData" :columns="tableInstanceListColumns"></Table>
            <!-- <Button @click="modalInstanceList = true">编辑</Button> -->
            <Modal v-model="modalInstanceList" title="编辑实例">
              <Form ref="formDataInstanceList" :model="formDataInstanceList" :rules="formRuleInstanceList" :label-width="80">
                <FormItem label="实例名称" prop="name">
                  <Input v-model="formDataInstanceList.name" type="text" placeholder="请输入vip"></Input>
                </FormItem>
                <FormItem label="VIP" prop="vip">
                  <Input v-model="formDataInstanceList.vip" type="text" placeholder="请输入vip"></Input>
                </FormItem>
                <FormItem label="Master IP" prop="master_ip">
                  <Input v-model="formDataInstanceList.master_ip" type="text" placeholder="请输入vip"></Input>
                </FormItem>
                <FormItem label="Slave1 IP" prop="slave1_ip">
                  <Input v-model="formDataInstanceList.slave1_ip" type="text" placeholder="请输入vip"></Input>
                </FormItem>
                <FormItem label="Slave2 IP" prop="slave2_ip">
                  <Input v-model="formDataInstanceList.slave2_ip" type="text" placeholder="请输入vip"></Input>
                </FormItem>
                <FormItem label="Port" prop="port">
                  <Input v-model="formDataInstanceList.port" type="text" placeholder="请输入vip"></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmitInstanceList('formDataInstanceList')">Submit</Button>
                  <Button type="ghost" @click="handleResetInstanceList('formDataInstanceList')" style="margin-left: 8px">Reset</Button>
                </FormItem>
              </Form>
              <div slot="footer"></div>
            </Modal>
          </div>
          <!-- 实例列表 end -->
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'instanceList',
  data () {
    return {
      /* 实例列表 start */
      modalInstanceList: false,
      formDataInstanceList: {
        name: '',
        vip: '',
        master_ip: '',
        slave1_ip: '',
        slave2_ip: '',
        port: ''
      },
      formRuleInstanceList: {
        name: [
          {required: true, message: '请输入vip', trigger: 'blur'}
        ],
        vip: [
          {required: true, message: '请输入vip', trigger: 'blur'}
        ],
        master_ip: [
          {required: true, message: '请输入Master IP', trigger: 'blur'}
        ],
        slave1_ip: [
          {required: true, message: '请输入Slave1 IP', trigger: 'blur'}
        ],
        slave2_ip: [
          {required: true, message: '请输入Slave2 IP', trigger: 'blur'}
        ],
        port: [
          {required: true, message: '请输入port', trigger: 'blur'}
        ]
      },
      /* 实例列表 end */
      responseInstanceList: {
        data: {
          data: {},
          message: '',
          status: ''
        },
        status: ''
      },
      tableInstanceListColumns: [
        {
          title: 'id',
          key: 'id',
          width: 70,
          sortable: true
        },
        {
          title: '实例名称',
          key: 'name',
          width: 100
        },
        {
          title: '审计员',
          key: 'auditor',
          width: 100
        },
        {
          title: '所属应用',
          key: 'application_name'
        },
        {
          title: '所属组件',
          key: 'component_name'
        },
        {
          title: '所属部门',
          key: 'department_name'
        },
        {
          title: '创建时间',
          key: 'create_time',
          width: 100
        },
        {
          title: '操作',
          key: '',
          render: (h, params) => {
            return h('Button', {
              on: {
                click: () => {
                  this.modalInstanceList = true
                  this.getOldDataInstance()
                }
              }
            }, '编辑')
          }
        }
      ],
      responseInstance: {
        data: {
          data: {},
          message: '',
          status: ''
        },
        status: ''
      }
    }
  },
  computed: {
    // formDataInstanceList: {
    //   set () {},
    //   get () {
    //     var data = this.responseInstance
    //     if (!data.length) { return }
    //     console.log(data)
    //     return {
    //       name: data.name,
    //       vip: data.vip,
    //       master_ip: data.master_ip,
    //       slave1_ip: data.slave_info[0].ip,
    //       slave2_ip: data.slave_info[1].ip,
    //       port: data.port
    //     }
    //   }
    // },
    tableInstanceListData: {
      set () {},
      get () {
        var result = []
        var data = this.responseInstanceList.data.data
        if (!data.length) { return [] }
        for (var i = 0, iLen = data.length; i < iLen; i++) {
          var obj = {}
          obj.application_name = data[i].application_name
          obj.auditor = data[i].auditor
          obj.component_name = data[i].component_name
          obj.create_time = data[i].create_time
          obj.department_name = data[i].department_name
          obj.id = data[i].id
          obj.name = data[i].name
          result.push(obj)
        }
        return result
      }
    }
  },
  methods: {
    /* 生成指定实例的原信息 start */
    getOldDataInstance () {
      this.$axios({
        method: 'get',
        url: 'http://10.99.1.135/redis/mock/edit/id/50'
      }).then(response => {
        console.log(response)
        this.responseInstance = response
        this.calcFormDataInstanceList()
        // this.formDataInstanceList = response.data.data
      })
    },
    calcFormDataInstanceList () {
      console.log(this.responseInstance)
      this.formDataInstanceList.name = this.responseInstance.data.data.name
      this.formDataInstanceList.vip = this.responseInstance.data.data.vip
      this.formDataInstanceList.master_ip = this.responseInstance.data.data.master_ip
      this.formDataInstanceList.slave1_ip = this.responseInstance.data.data.slave_info[0].ip
      this.formDataInstanceList.slave2_ip = this.responseInstance.data.data.slave_info[1].ip
      this.formDataInstanceList.port = this.responseInstance.data.data.port
    }
    /* 生成指定实例的原信息 end */
    /* 提交修改后的实例信息 start */
    // handleSubmitInstanceList (name) {
    //   this.$refs[name].validate((valid) => {
    //     if (valid) {
    //       this.modalInstanceList = false
    //       this.$axios({
    //         method: 'POST',
    //         url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/privileges/app',
    //         data: {
    //           user_ids: this.formDataMoniter
    //           // app_id: this.
    //         }
    //       }).then(response => {
    //         console.log(response)
    //         this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
    //       })
    //     } else {
    //       this.$Message.error('不可为空')
    //     }
    //   })
    // },
    // handleResetInstanceList (name) {
    //   this.$refs[name].resetFields()
    // },
    /* 提交修改后的实例信息 end */
    // 回馈提交状态
    // feedbackFormStatus (bool) {
    //   if (bool) {
    //     this.$Message.success('操作成功！')
    //   } else {
    //     this.$Message.error('操作失败！')
    //   }
    // }
  },
  mounted () {
    // 得到实例表格数据
    this.$axios({
      method: 'get',
      url: 'http://10.99.1.135/redis/mock/list/id/0'
    }).then(response => {
      // console.log(response)
      this.responseInstanceList = response
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
}
.instanceList {
  margin: 5px 0 0 0;
}
</style>
