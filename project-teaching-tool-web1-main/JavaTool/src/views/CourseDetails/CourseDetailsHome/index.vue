<template>
    <div class="page-content1">
        <a-card class="page-content-timeline">
            <ProjectTimeLine :events="events" />
        </a-card>
        <div class="page-content-project">
            <div class="page-content-project-left">
                <a-card class="NewProjectPie">

                    <ProjectPie />
                </a-card>
                <a-card class="Data-cabinet">
                    <ProjectDataCabinet />
                </a-card>
            </div>
            <a-card class="page-content-project-middle">
                <ProjectTask/>
            </a-card>
            <div class="page-content-project-right">
                <a-card class="Tools">
                    <ProjectTools />
                </a-card>
                <a-card class="TaskDynamics">
                    <ProjectDynamics />
                </a-card>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ProjectTimeLine from './ProjectTimeLine.vue';
import ProjectPie from './ProjectPie.vue';
import ProjectDataCabinet from './ProjectDataCabinet.vue';
import ProjectTask from './ProjectTask.vue';
import ProjectTools from './ProjectTools.vue';
import ProjectDynamics from './ProjectDynamics.vue';
import { ref } from 'vue';
const events = ref([
    { date: '2021-01-01', description: '项目立项', holder: '第一小组' },
    { date: '2021-02-14', description: '项目启动', holder: '第四小组' },
    { date: '2021-07-04', description: '需求分析', holder: '第三小组' },
    { date: '2021-07-04', description: '概要设计', holder: '第二小组' },
    { date: '2021-07-04', description: '前端1', holder: '第一小组' },
    { date: '2021-12-25', description: '前端2', holder: '第三小组' },
    { date: '2021-12-25', description: '后端1', holder: '第二小组' },
    { date: '2021-12-25', description: '后端2', holder: '第一小组' },
    { date: '2021-12-25', description: '数据库1', holder: '第一小组' },
    { date: '2021-12-25', description: '数据库2', holder: '第一小组' },
    { date: '2021-12-25', description: '前后端对接1', holder: '第一小组' },
    { date: '2021-12-25', description: '前后端对接2', holder: '第一小组' },
]);
</script>
<style scoped>
.page-content1 {
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
}

.page-content-timeline {
    flex: 0.8;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    margin-bottom: 1%;

}

.page-content-project {
    flex: 2;
    display: flex;
    /* min-width: 800px; */

}

.page-content-project-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 1%;
    /* min-width: 300px; */
}

.page-content-project-middle {
    flex: 2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    /* min-width: 600px; */
}

.page-content-project-right {
    flex: 1;
    flex-direction: column;
    display: flex;
    margin-left: 1%;

    /* min-width: 300px; */
}

.NewProjectPie {
    border-radius: 20px;
    flex: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    margin-bottom: 2%;

}

.Data-cabinet {
    flex: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    margin-top: 2%;
}

.Tools {
    flex: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    margin-bottom: 2%;
}

.TaskDynamics {
    flex: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    margin-top: 2%;
}

.header {
    background-color: rgb(112, 80, 201);
    color: #ffffff;
    padding: 0 16px;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>