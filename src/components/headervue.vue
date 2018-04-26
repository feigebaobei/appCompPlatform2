<template>
  <div class="header">
    <h1>应用管理后台</h1>
    <div class="userBox">
      <!-- <img src="../../static/images/food.jpg" alt="头像" class="headPhoto">
      <div class="user">
        <div class="static">
          <p>姓名<i class=""></i></p>
        </div>
        <div class="move">
          <p>quit</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .header {
    background: #334752;
    height: 60px;
    color: #eee;
    text-align: left;
    line-height: 60px;
    .headPhoto {
      width: 50px;
      height: 50px;
      margin: 5px;
      vertical-align: middle;
    }
    .user {
      vertical-align: middle;
      position: relative;
      border: 1px solid #777;
      border-radius: 5px;
    }
  }
</style>
