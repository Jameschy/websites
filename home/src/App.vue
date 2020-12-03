<template>
  <div id="app">
    <el-container>
      <el-header>
        <Nav></Nav>
      </el-header>

      <el-main>
        <Slide></Slide>
        <Cont2></Cont2>
      </el-main>

      <el-footer>
        <SiteMsg></SiteMsg>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

  import {
    el1,
    el2,
    Nav,
    SiteMsg,
    Cont1,
    Cont2,
    Slide
  } from "./components";

  export default {
    name: 'App',
    components:{
      el1,
      el2,
      Nav,
      SiteMsg,
      Cont1,
      Cont2,
      Slide
    }
  }
</script>

<style>
  /**{*/
    /*padding: 0;*/
    /*margin: 0;*/
    /*font-size: 0;*/
  /*}*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

.el-header, .el-footer {
  background-color: #000;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*max-width: 1260px;*/
  width: 100%;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
  margin: 0 auto;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
