<template>
  <div style="height: 97%;">
    <div class="head">
      <div style="display: flex; justify-content: space-between;width: 30%;">
        <a-select allowClear placeholder="请选择班级" ref="select" :field-names="{ label: 'className', value: 'classId' }"
          v-model:value="class_id" style="width: 200px;margin-right: 1%;" :options="classOptions" @focus="focus"
          @change="handleChange"></a-select>

        <a-select allowClear placeholder="请选择项目" ref="select"
          :field-names="{ label: 'projectName', value: 'projectId' }" v-model:value="project_id" style="width: 200px"
          :options="projectOptions" @focus="focus" @change="handleChange"></a-select>
        
      </div>

      <div style="display: flex; justify-content: space-between;width: 18%;">
        <a-segmented v-model:value="value" :options="['小组', '任务']" />
        <a-button type="primary" @click="toPublishTask()">发布任务</a-button>
      </div>
    </div>
    <div class="body" v-if="value == '任务'">
      <TaskCard v-for="task in tasks" :key="task.task_id" :values="task" />
    </div>
    <div class="body" v-else>
      <TeamCard v-for="team in teams" :key="team.teamId" :values="team" />
    </div>
  </div>



</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { SelectProps } from 'ant-design-vue';
import TaskCard from './TaskCard.vue';
import TeamCard from './TeamCard.vue';
import { useStore } from 'vuex';  
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
const store = useStore();  
//切换样式
const value = ref("任务")
//班级选项
const classOptions = store.getters.teachingClasss
const class_id = ref(null);
//项目选项
const projectOptions = store.getters.projects
const project_id = ref(null);

//模拟数据
const tasks = ref([
  {
    task_id: 1,//任务id 唯一标识符
    task_name: "学生用户表设计",//任务名称
    project_name: "教务工具",//所在项名称
    module_name: "数据库设计",//所在项目模块名称
    task_description: "根据学生需求设计学生用户表",//任务描述
    projectClass: [{ projectClass_id: 1002, projectClass_name: "2023级项目2班" }, { projectClass_id: 2002, projectClass_name: "2023级项目2班" }],//被分配到的班级，用班级id标识
    team: [{ team_id: 10002, team_name: "1组" }, { team_id: 20002, team_name: "2组" }],//被分配到的小组，用班级id标识
    proportion: 20,//任务权重
    deliverables: [{ deliverable_id: 100002, deliverable_name: "数据库设计word文档" }, { deliverable_id: 100002, deliverable_name: "数据库sql文件" }],//交付物对象数组
    endTime: dayjs(),//创建时间
    state_number: [3, 2, 3, 0]
  },
  {
    task_id: 2,//任务id 唯一标识符
    task_name: "教师用户表设计",//任务名称
    project_name: "教务工具",//所在项名称
    module_name: "数据库设计",//所在项目模块名称
    task_description: "根据教师需求设计教师用户表",//任务描述
    projectClass: [{ projectClass_id: 1002, projectClass_name: "2023级项目2班" }, { projectClass_id: 2002, projectClass_name: "2023级项目2班" }],//被分配到的班级，用班级id标识
    team: [{ team_id: 10003, team_name: "3组" }, { team_id: 20004, team_name: "4组" }],//被分配到的小组，用班级id标识
    proportion: 20,//任务权重
    deliverables: [{ deliverable_id: 100004, deliverable_name: "数据库设计word文档" }, { deliverable_id: 100005, deliverable_name: "数据库sql文件" }],//交付物对象数组
    endTime: dayjs(),//创建时间
    state_number: [3, 1, 3, 0]
  },
  {
    task_id: 3,//任务id 唯一标识符
    task_name: "教师用户表设计",//任务名称
    project_name: "教务工具",//所在项名称
    module_name: "数据库设计",//所在项目模块名称
    task_description: "根据教师需求设计教师用户表",//任务描述
    projectClass: [{ projectClass_id: 1002, projectClass_name: "2023级项目2班" }, { projectClass_id: 2002, projectClass_name: "2023级项目2班" }],//被分配到的班级，用班级id标识
    team: [{ team_id: 10003, team_name: "3组" }, { team_id: 20004, team_name: "4组" }],//被分配到的小组，用班级id标识
    proportion: 20,//任务权重
    deliverables: [{ deliverable_id: 100004, deliverable_name: "数据库设计word文档" }, { deliverable_id: 100005, deliverable_name: "数据库sql文件" }],//交付物对象数组
    endTime: dayjs(),//创建时间
    state_number: [3, 3, 3, 0]

  }
])
const teams = ref([
  {
    teamId: 1,
    teamName: '1组',
    teamLeader: '盐焗杰',
    projectName: "教务工具",//所在项名称
    moduleName: "数据库设计",//所在项目模块名称
    stateNumber: [3, 1, 3, 0],
  },
  {
    teamId: 2,
    teamName: '2组',
    teamLeader: '盐焗洁',
    projectName: "教务工具",//所在项名称
    moduleName: "数据库设计",//所在项目模块名称 
    stateNumber: [3, 1, 3, 0],
  }])

const focus = () => {
  console.log('focus');
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};


const router = useRouter()
const toPublishTask = () => {
  router.push({ name: '课程详情-任务管理-发布任务' })
}

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
  height: 85%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}
</style>
