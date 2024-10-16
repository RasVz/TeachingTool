<template>
  <div class="head">
    <!-- 项目详细信息 -->
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <a-button @click="back" style="float: none;">
        < 返回 </a-button>
          <span style="font-size: 24px;">
            {{ projectModules.projectName }}
          </span>
          <span></span>
    </div>
    <!-- <span style="color: rgb(115, 114, 137); margin-top: 1%;text-align: center;">
            总任务:{{ projectModules.totalTasks }}&nbsp;&nbsp;&nbsp;&nbsp;
          </span> -->
  </div>

  <div class="body">
    <!-- 展示项目的折叠面板 -->
    <a-collapse v-model:activeKey="activeKey" :bordered="true">
      <a-collapse-panel v-for="task in taskList " :key="task.key" :name="task.key">
        <template #header>
          <div style="display: flex; " class="header">
            <div style="width: 50%;">
              <span>
                {{ task.teamName }}&nbsp;&nbsp;&nbsp;&nbsp;组长: {{ task.studentName }}&nbsp;&nbsp;&nbsp;&nbsp; 所属班级:教学班1班
              </span>
            </div>
            <div class="a-progress" style="width: 50%;">
              <a-progress v-if="task.taskStatus==='2'" :percent="100" status="active" style="width: 70%;" />
              <a-progress v-else :percent="50" status="active" style="width: 70%;" />
            </div>
          </div>
        </template>
        <!-- 折叠面板展开的具体内容 -->
        <a-table :columns="columns" :data-source="taskList" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operate'">
              <span>
                <a-button type="primary" v-if="task.taskStatus === '2'">查看</a-button>
                <a-button v-else style="background-color: #ffc53d !important; color: white;">催促</a-button>
              </span>
            </template>
            <template v-if="column.dataIndex === 'progress'">
              <span v-if="task.taskStatus==='2'">完成</span>
              <span v-else>未完成</span>
            </template>
          </template>
        </a-table>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';

import { h, onMounted, reactive, ref, UnwrapRef, watch } from 'vue';
import store from '@/store';
import TaskDao from '@/daos/task_dao';
const taskDao = new TaskDao()
const activeKey = ref(['1']);
//列的定义
interface column {
  title: string,
  dataIndex: string,
}
//数据接口的定义
interface taskList {
  key: string,
  name: string,
  desc: string,
  leader: string,
  project: string,
  team: string,
  deadline: string,
  progress: string,
}
//列的具体内容（数据应从后端获取）
const columns: UnwrapRef<column[]> = reactive<column[]>([
  {
    title: '任务名称',
    dataIndex: 'taskName',
  },
  {
    title: '任务描述',
    dataIndex: 'taskDescription'
  },
  {
    title: '任务截止时间',
    dataIndex: 'endTime'
  },
  {
    title: '任务进度',
    dataIndex: 'progress',
  },
  {
    title: '操作',
    dataIndex: 'operate',
  }
]);
//任务具体内容（数据应从后端获取）
// const taskList: UnwrapRef<taskList[]> = reactive<taskList[]>([
//   {
//     key: '1',
//     name: '任务1',
//     desc: '任务描述1',
//     leader: '张三',
//     project: 'project1',
//     team: 'team1',
//     deadline: '2024-09-06',
//     progress: '完成'
//   },
//   {
//     key: 'task2',
//     name: '任务2',
//     desc: '任务描述2',
//     leader: '战率',
//     project: 'project2',
//     team: 'team2',
//     deadline: '2024-09-06',
//     progress: '完成'

//   },
//   {
//     key: 'task3',
//     name: '任务3',
//     desc: '任务描述3',
//     leader: '韩序',
//     project: 'project1',
//     team: 'team3',
//     deadline: '2024-09-06',
//     progress: '未完成'

//   },
//   {
//     key: 'task4',
//     name: '任务4',
//     desc: '任务描述4',
//     leader: '王五',
//     project: 'project2',
//     team: 'team4',
//     deadline: '2024-09-06',
//     progress: '未完成'
//   },
// ]);
const taskList = ref([])
//项目模块详情
const projectModules =
{
  projectName: "项目式教学管理工具",
  module: '数据库设计',
  moduleDescription: '根据需求文档设计数据库',
  totalTasks: '4'
};

watch(activeKey, val => {
  console.log(val);
});

onMounted(() => {
  const init = async (courseId: number) => {
    let result = await taskDao.findTaskStatus(1001);
    taskList.value = result.data.data
    console.log(result)
  };
  init(store.getters.courseId)
})

//返回上一级
const router = useRouter()
const back = () => {
  router.push({ name: '课程详情-课程首页-课程动态' })
}



</script>

<style scoped>
.head {
  display: flex;
  flex-direction: column;
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
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}

.a-progress {
  width: 30%;
  margin-left: 10px;
}
</style>