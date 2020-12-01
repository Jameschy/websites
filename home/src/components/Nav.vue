<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#000"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">模板列表</template>
      <el-menu-item index="2-1">VUE</el-menu-item>
      <el-menu-item index="2-2">原生</el-menu-item>
      <el-menu-item index="2-3">PHP</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">资讯列表</template>
      <el-menu-item index="2-1">PHP</el-menu-item>
      <el-menu-item index="2-2">前端</el-menu-item>
      <el-menu-item index="2-3">SEO</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <!--<el-menu-item index="3" disabled>消息中心</el-menu-item>-->
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
  </el-menu>
</template>

<script>
    export default {
        name: "Nav",
        data() {
          return {
            activeIndex: '1',
            activeIndex2: '1'
          };
        },
        methods: {
          handleSelect(key, keyPath) {
            console.log(key, keyPath);
          }
        }
      }
</script>

<style scoped>

</style>
