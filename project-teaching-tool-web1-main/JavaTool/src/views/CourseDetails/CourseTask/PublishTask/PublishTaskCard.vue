<template>
    <div class="card">
        <div class="massage">
            <div style="font-size: 20px;width: 100%;display: flex;justify-content: space-between;">
                <div>
                    <span style="font-weight: bold;">
                    {{ props.task.taskName }}
                  
                </span>
                --
                <span>{{props.task.projectName}}</span>
                </div>
            
              
                <div class="operate">
                    <a @click.stop="visible2 = true" style="margin:0 2%;">发布</a>
                    <span style="font-weight: 100;">|</span>
                    <a @click.stop="visible3 = true" style="margin: 0 2%;">编辑</a>
                    <span style="font-weight: 100;">|</span>

                    <a style="margin:0 2%;color: red;" @click="showDeleteConfirm">删除</a>

                </div>
            </div>
            <div style="margin-top: 1%;width: 100%;display: flex; justify-content: space-between; ">
                
                <div  style="display: flex;width: 80%;">
                    <span class="label"> 任务描述 :</span>
                    <span style=" margin-left : 1%;">
                    {{ props.task.taskDescription }}
                </span>
                </div>
                <span >
                    {{ dayjs(props.task.createTime).format('YYYY年MM月DD日 HH:mm:ss') }}
                </span>
            </div>

            <div style="margin-top: 1%;display:flex;flex-direction: row;">
                <span class="label">
                    任务交付物 :
                </span>
                <div style="display: flex;flex-direction: column; width: 50%;">
                    <span v-for="(deliverable, index) in props.task.deliverableList" :key="index"
                        style="margin: 0 0 1% 2%;">
                        {{ index + 1 }}、{{ deliverable.deliverableName }}
                    </span>
                </div>
            </div>

            <div style="margin-top: 1%;display: flex;">
                <span class="label">已发布班级 :</span>
                <span v-for="team in props.task.teamList" :key="team.teamId" style=" margin: 0 1%;">
                    {{ team.className }}--{{ team.teamName }}
                </span>
            </div>

        </div>
    </div>
    <contextHolder />
    <ToPublic :task="taskToPublic"  :teamHasTask="props.task.teamList"  :modelVisible="visible2" @update:modelVisible="(val) => { visible2 = val }" />
    <!-- <ToEdit :task="taskToEdit" :modelVisible="visible3" @update:modelVisible="(val) => { visible3 = val }" /> -->
</template>
<script lang="ts" setup>

import { ref } from 'vue';
import { Modal } from 'ant-design-vue';
import ToPublic from './ToPublic.vue';
import ToEdit from './ToEdit.vue';
import dayjs from 'dayjs';

interface deliverable {
    deliverableId: number;//交付物id 唯一标识符
    deliverableName: string//交付物名称
}

interface team {
    teamId: number;//小组id 唯一标识符
    teamName: string;//小组名称
    classId:string;
    className: string;
}
interface task {
    taskId: number;//任务id 唯一标识符
    taskName: string;//任务名称
    projectName: string//所在项目名称
    projectId:number;
    taskDescription: string;//任务描述
    teamList: team[];//被分配到的小组，用班级id标识
    proportion: number;//任务权重
    deliverableList: deliverable[];//交付物对象数组
    createTime: dayjs.Dayjs//创建时间
}

const props = defineProps({
    task: {
        type: Object as () => task,
        request: true,
    }
})
const taskToPublic = ref({
    task_id: props.task.taskId,
    task_name: props.task.taskName,
    // projectClass: props.task.projectClass

})
const taskToEdit = ref({
    task_id: props.task.taskId,
    task_name: props.task.taskName,
    task_description: props.task.taskDescription,
    // deliverables: props.task.deliverables,
})

//窗口模块
const [modal, contextHolder] = Modal.useModal();
const showDeleteConfirm = () => {
    modal.confirm({
        title: '任务名1',
        content: '确认删除该任务?',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

//窗口状态
const visible2 = ref<boolean>(false);
const visible3 = ref<boolean>(false);

</script>
<style scoped>
.card {
    display: flex;
    align-items: center;
    padding: 1%;
    margin: 0.5%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;
}

.card:hover {
    background-color: rgb(237, 238, 239);

    box-shadow: 0 4px 8px 0 rgba(24, 23, 25, 0.2);
    transition: all 0.2s;

}

.massage {
    display: flex;
    flex-direction: column;

    width: 100%;
}

.progress {
    display: flex;
    flex-direction: row;
    margin-right: 10%;
}

.operate {
    display: flex;
    justify-content: flex-end;
    width: 20%;

}

.label {
    width: 80px;
    font-weight: bold;
    text-align: right;
}
</style>