<template>
  <div style="height: 97%;"> 
    <div class="head">
      <a-radio-group v-model:value="value" button-style="solid">
        <a-space size="middle">
          <a-radio-button value="">全部课程</a-radio-button>
          <a-radio-button value="进行中">进行中的课程</a-radio-button>
          <a-radio-button value="暂停">暂停的课程</a-radio-button>
          <a-radio-button value="未完成">未完成课程</a-radio-button>
          <a-radio-button value="已完成">已完成课程</a-radio-button>
          <a-radio-button value="已归档">已归档课程</a-radio-button>
        </a-space>
      </a-radio-group>
      <div style="margin-right: 25px;float: right;">
          <a-button type="primary" @click="visible1 = true">新增课程</a-button>
        </div>
    </div>

    <div  class="body">
      <AllCourse />
    </div>
</div>
    <CreateCourses :modelVisible="visible1" @update:modelVisible="(val) => { visible1 = val }" />
  
  </template>
  
  <script lang="ts" setup>
  import {  ref, reactive } from 'vue';
  import AllCourse from '@/views/CoursesList/AllCourse.vue'
  import CreateCourses from './CreateCourses.vue';
  //创建任务窗口状态
  const visible1 = ref<boolean>(false);
  //顶部任务状态选取值
  const value = ref<string>('');
  </script>
  
  <style scoped>
.head {
  display: flex;
  justify-content: space-between;
  padding: 1.5%;
  margin: 1%;
  height: auto;
  /* 使容器高度为视口高度 */
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}

.body {
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  margin: 1%;
  height: 85%;
  /* 使容器高度为视口高度 */
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}
</style>
