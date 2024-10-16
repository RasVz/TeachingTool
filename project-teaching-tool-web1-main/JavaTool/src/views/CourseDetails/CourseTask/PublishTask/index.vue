<template>
  <div style="height: 97%;">
    <div class="head">
      <div>
        <a-button @click="back">
          < 返回</a-button>
            <a-select allowClear placeholder="请选择项目" ref="select"
              :field-names="{ label: 'projectName', value: 'projectId' }" v-model:value="project_id"
              style="width: 200px" :options="projectOptions"  @change="handleChange"></a-select>

      </div>


      <div>


        <a-button type="primary" @click="visible1 = true">创建任务</a-button>
      </div>
    </div>
    <div class="body">
      <a-spin size="large" :spinning="loading" >
      <PublishTaskCard v-for="task in tasks" :key="task.task_id" :task="task" />
      </a-spin>
    </div>
  </div>


  <CreateTask :modelVisible="visible1" @update:modelVisible="(val) => { visible1 = val }" />


</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import CreateTask from '@/views/CourseDetails/CourseTask/PublishTask/CreateTask.vue';
import PublishTaskCard from './PublishTaskCard.vue'
import { useStore } from 'vuex';
import TaskDao from '@/daos/task_dao';
const taskDao = new TaskDao()
const router = useRouter()
const store = useStore()


//项目选项
const projectOptions = store.getters.projects
const project_id = ref(null);
//加载状态
const loading = ref(true);
//返回按钮方法
const back = () => {
  router.push({ name: '课程详情-任务管理-任务设置' })
}


const allTasks = ref([])
const tasks = ref([]);
onMounted(() => {
  const init = async (courseId: number) => {
    let result = await taskDao.findCoursesByTeacherId(courseId);
    allTasks.value = result.data.data
    tasks.value = allTasks.value
    console.log(allTasks.value);
    
    loading.value = false
  };
  init(store.getters.courseId)


})


const handleChange = (value: string|null) => {
  console.log(value);
  
  if(value !== null && value !== undefined){
    tasks.value = allTasks.value.filter(item => item.projectId === value); 
  
  }
  else
  tasks.value = allTasks.value
};

//窗口状态
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
}

.body {
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  margin: 1%;
  height: 83%;
  min-height: 83%;
  max-height: 83%;

  /* 使容器高度为视口高度 */
  /* max-width: 98%;
      min-width: 98%; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}
</style>