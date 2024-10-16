<template>

  <div class="all">

    <div style="margin:2% 0 0 2%;"> 
      <h2>用户名称</h2>
    </div>

    <div>
      <a-row>
        <a-col>
          <a-statistic title="项目数" :value="4" class="col" />
        </a-col>
        
        <a-col>
          <a-statistic title="任务数" :value="6" class="col" />
        </a-col>
        <a-col>
          <a-statistic title="上传次数" :value="11" class="col" />
        </a-col>
      </a-row>
    </div>


  </div>


</template>
<script lang="ts" setup>


</script>
<style scoped>
.all {
  display: flex;
  /* height: 100%; */
  padding: 2%;
  flex-direction: column;
  justify-content: space-around;
  justify-items: center;
  flex-wrap: wrap;

}
.col{
  margin:0 5px;
  text-align: center;
}
</style>