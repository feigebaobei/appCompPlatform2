<template>
  <div>
    <Layout>
      <Content>
        <Card>
          <Header class="title" theme="light">
            <Row>
              <Col span="11">
                <h1>实例详情</h1>
              </Col>
            </Row>
          </Header>
          <!-- 实例详情 start -->
          <div class="detail">
            <!-- 应当对返回的数据的状态字段做判断。可是现在接口里没有这个字段，只能直接输出了。 -->
            <Row style="margin: 10px 0;">
              <Col span='4'>实例名称</Col>
              <!-- <Col span='8' v-html="response.data.data.desc"></Col> -->
              <Col span='4'>CPU核数</Col>
              <!-- <Col span='8' v-html="response.data.data.desc"></Col> -->
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>实例ip</Col>
              <!-- <Col span='8' v-html="response.data.data.desc"></Col> -->
              <Col span='4'>CPU核序号</Col>
              <!-- <Col span='8' v-html="response.data.data.desc"></Col> -->
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>实例状态</Col>
              <!-- <Col span='8' v-html="response.data.data.desc"></Col> -->
              <Col span='4'>内存</Col>
              <!-- <Col span='8' v-html="response.data.data.desc"></Col> -->
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>申请人</Col>
              <!-- <Col span='8' v-html="response.data.data.desc"></Col> -->
              <Col span='4'>硬盘</Col>
              <!-- <Col span='8' v-html="response.data.data.desc"></Col> -->
            </Row>
            <Row style="margin: 10px 0;">
              <Col span='4'>创建时间</Col>
              <!-- <Col span='8' v-html="response.data.data.desc"></Col> -->
              <Col span='4'>最大连接数</Col>
              <!-- <Col span='8' v-html="response.data.data.desc"></Col> -->
            </Row>
          </div>
          <!-- 实例详情 end -->
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
      }
    }
  },
  methods: {},
  mounted () {
    this.$axios({
      methods: '',
      url: '',
      data: {}
    }).then(respons => {
      this.responsAudit = respons
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
