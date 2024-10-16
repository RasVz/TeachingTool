<template>
  <div class="content">
    <h1 class="title">项目进度</h1>
    <div class="progress-explanation">
      <p><span class="color-box ongoing"></span> 蓝色：任务进行中</p>
      <p><span class="color-box completed"></span> 绿色：任务已完成</p>
      <p><span class="color-box not-started"></span> 灰色：任务未完成部分</p>
    </div>
    <div class="row-style" v-for="(project, index) in projectsWithStatus" :key="index">
      <a-typography class="project-name">{{ project.name }}</a-typography>
      <div class="task-container" style="display: flex; overflow-x: auto;">
        <a-col :span="4" v-for="(task, taskIndex) in project.tasks" :key="taskIndex">
          <a-progress :percent="task.percent" :show-info="false" :stroke-color="getTaskColor(task.status)" />
          <p class="task-text">{{ task.name }}: {{ task.percent }}%</p>
        </a-col>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const projects = ref([
  {
    name: '项目1:',
    tasks: [
      { name: '任务1', percent: 0 },
      { name: '任务2', percent: 50 },
      { name: '任务3', percent: 70 },
      { name: '任务4', percent: 100 },

    ]
  },
  {
    name: '项目1:',
    tasks: [
      { name: '任务1', percent: 0 },
      { name: '任务2', percent: 50 },
      { name: '任务3', percent: 70 },
      { name: '任务4', percent: 100 },
      { name: '任务5', percent: 50 },
      { name: '任务6', percent: 50 },
      { name: '任务7', percent: 50 },
      { name: '任务8', percent: 50 },
    ]
  },
  {
    name: '项目1:',
    tasks: [
      { name: '任务1', percent: 0 },
      { name: '任务2', percent: 50 },
      { name: '任务3', percent: 70 },
      { name: '任务4', percent: 100 },
      { name: '任务5', percent: 50 },
      { name: '任务6', percent: 50 },
      { name: '任务7', percent: 50 },
      { name: '任务8', percent: 50 },
    ]
  },
  {
    name: '项目1:',
    tasks: [
      { name: '任务1', percent: 0 },
      { name: '任务2', percent: 50 },
      { name: '任务3', percent: 70 },
      { name: '任务4', percent: 100 },
      { name: '任务5', percent: 50 },
      { name: '任务6', percent: 50 },
      { name: '任务7', percent: 50 },
      { name: '任务8', percent: 50 },
    ]
  },
  {
    name: '项目1:',
    tasks: [
      { name: '任务1', percent: 0 },
      { name: '任务2', percent: 50 },
      { name: '任务3', percent: 70 },
      { name: '任务4', percent: 100 },
      { name: '任务5', percent: 50 },
      { name: '任务6', percent: 50 },
      { name: '任务7', percent: 50 },
      { name: '任务8', percent: 50 },
    ]
  },

]);

const projectsWithStatus = computed(() => {
  return projects.value.map(project => {
    const tasks = project.tasks.map(task => {
      let status;
      if (task.percent === 0) {
        status = 'not-started';
      } else if (task.percent === 100) {
        status = 'completed';
      } else {
        status = 'ongoing';
      }
      return { ...task, status };
    });
    return { ...project, tasks };
  });
});

const getTaskColor = (status) => {
  switch (status) {
    case 'ongoing':
      return 'blue';
    case 'completed':
      return 'rgb(31, 237, 31)';
    case 'not-started':
      return 'rgb(245, 242, 242)';
    default:
      return 'rgb(245, 242, 242)';
  }
};
</script>




<style scoped>
.title {
  text-align: center;
  /* 居中标题 */
  font-weight: bold;
  /* 加粗标题 */
  margin-bottom: 60px;
  /* 设置标题与下面内容的间距 */
  font-size: 5ch;
  margin-top: 30px;
}

.row-style {
  margin-bottom: 70px;

}

.project-name {
  margin-bottom: 10px;
  font-weight: bold;
  /* 加粗标题 */
  font-size: large;
}

.task-text {
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  margin: 1%;
  height:95%;
  min-height: 95%; 
  max-height: 95%;  /* 使容器高度为视口高度 */
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}

.task-container {
  display: flex;
  /* 使用 flex 布局 */
  overflow-x: auto;
  /* 当内容超出容器宽度时，显示水平滚动条 */
  gap: 1px;
  /* 设置任务之间的间距 */
}

/* 调节水平滚动条 */
.task-container::-webkit-scrollbar {
  width: 20px;
  /* 滚动条宽度 */
}

.task-container::-webkit-scrollbar-thumb {
  background: #888;
  /* 颜色 */
}

.task-container::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* 鼠标悬浮时颜色 */
}

.color-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
  /* 设置为圆角 */
  min-width: none 10px;
}

.ongoing {
  background-color: blue;

}

.completed {
  background-color: rgb(31, 237, 31);
}

.not-started {
  background-color: rgb(245, 242, 242);
}
</style>