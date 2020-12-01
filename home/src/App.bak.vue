<template>

  <div id="app">
        <Nav></Nav>

    <img src="./assets/logo.png">
    <router-view/>
    <el1></el1>
    <el2></el2>
  </div>


</template>

<script>

  import {el1,el2,Nav} from "./components";

  export default {
    name: 'App',

    components:{
      el1,
      el2,
      Nav
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
