<template>
  <div>
    <Layout>
      <Content>
        <Card>
          <Header class="title" theme="light">
            <Row>
              <Col span="11">
                <h1>实例审核</h1>
              </Col>
            </Row>
          </Header>
          <!-- 实例详情 start -->
          <div class="detail">
            <!-- 应当对返回的数据的状态字段做判断。可是现在接口里没有这个字段，只能直接输出了。 -->
            <Row style="margin: 10px 0;">
              <Col span='4'>实例名称</Col>
              <Col span='8' v-html="responsAudit.data.data.name"></Col>
              <Col span='4'>申请者</Col>
              <Col span='8' v-html="responsAudit.data.data.proposer"></Col>
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>所属部门</Col>
              <Col span='8' v-html="responsAudit.data.data.department_name"></Col>
              <Col span='4'>申请理由</Col>
              <Col span='8' v-html="responsAudit.data.data.remark"></Col>
            </Row>
          </div>
          <!-- 实例详情 end -->
          <!-- 实例审核表单 start -->
          <Form ref="formDataAudit" :model="formDataAudit" :rules="formruleAudit" :label-width="100">
            <!-- <FormItem label="Gender" prop="gender">
                <RadioGroup v-model="formValidate.gender">
                    <Radio label="male">Male</Radio>
                    <Radio label="female">Female</Radio>
                </RadioGroup>
            </FormItem> -->
            <hr class="hr">
            <Row style="margin: 10px 0;">
              <Col span="4">
                实例配置
              </Col>
              <Col span="20" style="color: #ed3f14">
                不通过时不用填写
              </Col>
            </Row>
            <FormItem label="VIP" prop="vip">
              <Input v-model="formDataAudit.vip" type="text" placeholder="请输入vip"></Input>
            </FormItem>
            <FormItem label="Master IP" prop="masterIp">
              <Input v-model="formDataAudit.masterIp" type="text" placeholder="请输入Master IP"></Input>
            </FormItem>
            <FormItem label="Slave1 IP" prop="slaveIp1">
              <Input v-model="formDataAudit.slaveIp1" type="text" placeholder="请输入Slave1 IP"></Input>
            </FormItem>
            <FormItem label="Slave2 IP" prop="slaveIp2">
              <Input v-model="formDataAudit.slaveIp1" type="text" placeholder="请输入Slave2 IP"></Input>
            </FormItem>
            <FormItem label="Port" prop="port">
              <Input v-model="formDataAudit.port" type="text" placeholder="请输入Port"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmitComponent('formDataAudit')">Submit</Button>
              <Button type="ghost" @click="handleResetComponent('formDataAudit')" style="margin-left: 8px">Reset</Button>
            </FormItem>
          </Form>
          <!-- 实例审核表单 end -->
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'auditvue',
  data () {
    return {
      responsAudit: {
        data: {
          data: {},
          message: '',
          status: ''
        },
        status: ''
      },
      formDataAudit: {
        vip: '',
        masterIp: '',
        slaveIp1: '',
        slaveIp2: '',
        port: '',
        gender: ''
      },
      formruleAudit: {
        vip: [
          {required: true, message: '请选择组件类型', trigger: 'change'}
        ]
      }
    }
  },
  computed: {
  },
  methods: {
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
    // 计算表单数据
    calcFormDataAudit () {
      this.formDataAudit.vip = this.responsAudit.data.data.vip
      this.formDataAudit.masterIp = this.responsAudit.data.data.master_ip
      this.formDataAudit.slaveIp1 = this.responsAudit.data.data.slave_info.length ? this.responsAudit.data.data.slave_info[0].ip : ''
      this.formDataAudit.slaveIp2 = this.responsAudit.data.data.slave_info.length ? this.responsAudit.data.data.slave_info[1].ip : ''
      this.formDataAudit.port = this.responsAudit.data.data.port
    }
  },
  mounted () {
    // 请求实例审核的字段信息
    this.$axios({
      method: 'get',
      url: 'http://10.99.1.135/redis/mock/audit/id/' + this.appId()
    }).then(response => {
      console.log(response)
      this.responsAudit = response
      this.calcFormDataAudit()
    })
    // 请求实例审核的表单信息
    this.$axios({
      method: 'post',
      url: 'http://10.99.1.135/redis/mock/do_audit',
      data: this.qs.stringify({
        id: this.appId(),
        vip: '',
        master_ip: '',
        port: '',
        slave_ip: [1, 2],
        // slave_ip[]: '',
        status: '',
        bind_cpu: ''
      })
    }).then(response => {
      // console.log(response)
      this.responsAudit = response
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
