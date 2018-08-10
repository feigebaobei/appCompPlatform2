<template>
  <!-- <div> -->
    <Sider :style="{height: '100vh', left: 0, overflow: 'auto', background: '#fff'}" class="aside">
      <Menu :active-name="curSelectedNav" theme="light" width="auto" :open-names="['1']">
        <a href="./index.html">
          <MenuItem name="1-1">
            <Icon type="ios-navigate"></Icon>
            <span>应用管理</span>
          </MenuItem>
        </a>
          <Submenu name="2">
              <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  实例管理
              </template>
              <a href="./instanceList.html"><MenuItem name="2-1">实例列表</MenuItem></a>
              <a href="./auditList.html"><MenuItem name="2-2">审核列表</MenuItem></a>
          </Submenu>
      </Menu>
    </Sider>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'sidervue',
  props: ['curSelectedNav']
}
</script>

<style lang="scss">

</style>
