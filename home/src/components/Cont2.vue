<template>
  <el-row :gutter="10">
    <el-col :xs="4" :sm="6" :md="8" :lg="3"><div class="grid-content bg-purple">A</div></el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="9"><div class="grid-content bg-purple-light">B</div></el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="9"><div class="grid-content bg-purple">C</div></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="3"><div class="grid-content bg-purple-light">D</div></el-col>
  </el-row>
</template>

<script>
    export default {
        name: "Cont2",
        data(){
          msg:"data";
        }
    }
</script>

<style scoped>
  h2{
    font-size: 18px;
    color: #0b2e13;
    text-align: center;

  }
  .text {
    font-size: 14px;

  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
  .grid-content{
    font-size: 24px;
    color: #0b2e13;
    text-align: center;
  }
</style>
