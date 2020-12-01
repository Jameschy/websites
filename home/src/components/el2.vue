<template>
  <div>
    <!-- 因为template里面只能有一个根元素，官方这里拷过来以后在外面加了一层div标签包起来 -->
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
  </div>
</template>

<script>
    export default {
        name: "Radio",
        data(){
          return{
            radio:'1'
          };
        }
    }
</script>

<style scoped>

</style>
