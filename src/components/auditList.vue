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
          <!-- 详情 start -->
          <div class="detail">
            <Table></Table>
            <a href="./audit.html">
              <Button>go to 查看</Button>
            </a>
          </div>
          <!-- 详情 end -->
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'auditList'
}
</script>

<style lang="scss">

</style>
