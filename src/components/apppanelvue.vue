<template>
  <div class="apppanel">
  <!-- <Row class="content"> -->
    <!-- apppanelvue -->
    <!-- {{item}} -->
  <!-- <Col span="8" class="apppanel"> -->
    <h3 v-html="item.name" class="titleName"></h3>
    <p class="deptName">
      <span v-html="item.dept_name"></span>
      <span class="monite" v-html="item.flag ? '管理' : ''"></span>
    </p>
      <div class="content">
        <!-- <Badge count="3"> -->
        <!-- <a href="#" class="demo-badge" v-for="item in calcComptName" v-html="item"></a> -->
        <span class="badge" v-for="text in calcComptName" v-html="text" :key="text"></span>
        <!-- </Badge> -->
      </div>
    <Row class="bottom">
      <Col span="15">
        <span>管理员：</span><span v-html="item.admin_name" class="name"></span>
      </Col>
      <Col span="9">
        <a :href="link(item)">
          <Button>进入应用</Button>
        </a>
      </Col>
    </Row>
  <!-- </Col> -->
  <!-- </Row> -->
  </div>
</template>

<script>
export default {
  name: 'apppanelvue',
  props: ['item'],
  data () {
    return {}
  },
  computed: {
    calcComptName () {
      // console.log(this.item)
      var str = this.item.compt_name
      var arr = str.split(',')
      // console.log(arr)
      return arr
    }
  },
  methods: {
    link (item) {
      return './appDetail.html?id=' + item.id
    }
  }
}
</script>

<style lang="scss" scoped>
.apppanel {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 15px 10px;
  padding: 12px 10px;
  display: inline-block;
  width: 260px;
  .titleName {
    display: inline-block;
  }
  .deptName {
    display: inline-block;
    text-align: right;
    float: right;
  }
  .content {
    margin: 15px 5px 10px;
    .badge{
      height: 42px;
      background: #eee;
      border-radius: 6px;
      display: inline-block;
      line-height: 42px;
      text-align: middle;
      padding: 0 10px;
      text-align: center;
      margin: 0 5px;
    }
  }
  .monite {
    color: #fff;
    background: #e22;
    border-radius: 3px;
    padding: 0px 3px;
  }
  .bottom {
    .name {
      max-width: 75%;
      word-break: break-all;
    }
  }
}
</style>
