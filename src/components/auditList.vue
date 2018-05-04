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
          <!-- 实例审核列表 start -->
          <div class="auditList">
            <Table height="600" border :data="tableAuditListData" :columns="tableAuditListColumns"></Table>
            <a href="./audit.html">
              <Button>go to 查看</Button>
            </a>
          </div>
          <!-- 实例审核列表 end -->
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'auditList',
  data () {
    return {
      /* 实例审核列表的数据 start */
      tableAuditListColumns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '实例名称',
          key: 'name'
        },
        {
          title: '组件类型',
          key: 'component_name'
        },
        {
          title: '创建者',
          key: 'proposer'
        },
        {
          title: '所属部门',
          key: 'department_name'
        },
        {
          title: '创建时间',
          key: 'create_time'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '查看',
          key: '',
          render: (h, params) => {
            // console.log(params)
            return h('a', {
              attrs: {
                href: './audit.html?id=' + params.row.id
              }
            }, '查看')
          }
        }
      ],
      responseAuditList: {
        data: {
          data: {},
          message: '',
          status: ''
        },
        status: ''
      }
      /* 实例审核列表的数据 end */
    }
  },
  computed: {
    /* 实例审核列表的数据 start */
    tableAuditListData: {
      set () {},
      get () {
        var result = []
        var data = this.responseAuditList.data.data
        if (!data.length) { return [] }
        for (var i = 0, iLen = data.length; i < iLen; i++) {
          var obj = {}
          obj.apply_name = data[i].apply_name
          obj.component_name = data[i].component_name
          obj.create_time = data[i].create_time
          obj.department_name = data[i].department_name
          obj.id = data[i].id
          obj.name = data[i].name
          obj.proposer = data[i].proposer
          obj.status = data[i].status
          result.push(obj)
        }
        return result
      }
    }
    /* 实例审核列表的数据 end */
  },
  mounted () {
    // 请求实例审核列表的数据
    this.$axios({
      method: 'get',
      url: 'http://10.99.1.135/redis/mock/audit_list'
    }).then(response => {
      // console.log(response)
      this.responseAuditList = response
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
.auditList {
  margin: 5px 0 0 0;
}
</style>
