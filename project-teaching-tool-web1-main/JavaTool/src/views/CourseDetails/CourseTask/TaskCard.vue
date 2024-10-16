<template>
    <div class="card" @click="goAchievementScoring(1)">
        <div style="margin:0 2% 0 2%;">
            <SvgIcon name='task' class="icon"></SvgIcon>
        </div>

        <div class="massage">
            <div style="  display: flex; width: 60%; flex-direction: column;">
                <span style="font-size: 20px;"> {{ props.values.task_name }}</span>
                <span style="margin-top: 2.5%;"> 分数占比 :<span style="color: red; margin-left : 2%;">{{
                    props.values.proportion }}%</span></span>
                <span style="margin-top: 2.5%;"> 承担对象 :
                    <span v-for="team in props.values.team" :key="team.team_id" style=" margin: 0 1%;">
                        {{ team.team_name }}
                    </span>
                </span>
                <span style="margin-top: 2.5%;">
                    所属项目 :
                    <span style="margin-left: 2%;">{{ props.values.project_name }}-{{ props.values.module_name }}</span>
                </span>

                <span style="margin-top: 2.5%;"> 截至日期 :<span style="margin-left: 2%;">{{
                    props.values.endTime.format('YYYY年MM月DD日 HH:mm:ss') }}</span></span>
            </div>
        </div>
        <div style="width: auto;" class="progress">
            <div style="display: flex; flex-direction: column;margin: 0 15px;">

                <a-progress type="dashboard" :percent="unFinish" :stroke-color="{
                    '0%': '#108ee9',
                    '100%': '#108eee',
                }" />
                <span style="text-align: center;margin-top: -10%;">
                    {{ props.values.state_number[1] }}/{{ props.values.state_number[0] }}</span>
                <span style="text-align: center;margin-top: 1%;">已提交</span>
            </div>
            <div style="display: flex; flex-direction: column;margin: 0 15px;">

                <a-progress type="dashboard" :percent="unReviewed" :stroke-color="{
                    '0%': '#108ee9',
                    '100%': '#108eee',
                }" />
                <span style="text-align: center;margin-top: -10%;">{{ props.values.state_number[3] }}/{{
                    props.values.state_number[2] }}</span>
                <span style="text-align: center;margin-top: 1%;">已批阅</span>
            </div>

        </div>

        <div class="operate" @click.stop="">
            <div @click="showTaskDescrition(props.values)"> <a>任务描述</a></div>
            <div @click.stop="visible1 = true">
                <a>修改发布任务</a>
            </div>
            <div @click="showDeleteConfirm(props.values.task_name)">
                <a>取消任务</a>
            </div>
        </div>

    </div>
    <contextHolder />
    <ModifyTask :value="props.values" :modelVisible="visible1" @update:modelVisible="(val) => { visible1 = val }" />
</template>
<script lang="ts" setup>

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'ant-design-vue';
import ModifyTask from './ModifyTask.vue';
import dayjs from 'dayjs';

interface deliverable {
    deliverable_id: number;
    deliverable_name: string;
}

interface team {
    team_id: number;//小组id 唯一标识符
    team_name: string//小组名称
}

interface task {
    task_id: number;//任务id 唯一标识符
    task_name: string;//任务名称
    project_name: string;//所在项目名称
    module_name: string;//所在项目模块名称
    task_description: string;//任务描述
    team: team[];//被分配到的小组，用班级id标识
    proportion: number;//任务权重
    deliverables: deliverable[];//交付物对象数组
    endTime: dayjs.Dayjs//创建时间
    state_number: number[];//任务的状态数量0：全部数量 ，1：未完成， 2：已完成，3：带批阅
}

//modelVisible用于开关窗口
const props = defineProps({
    values: {
        type: Object as () => task,
        default: false
    },
    type: {
        type: String,
        default: null
    }
})
const emit = defineEmits(['update:modelVisible']);

//设置传值数据
//未完成数量
const unFinish = computed(() => {
    const percent = (props.values.state_number[1] / props.values.state_number[0]) * 100
    return parseFloat(percent.toFixed(1));
})
//未批阅数量
const unReviewed = computed(() => {
    const percent = (props.values.state_number[3] / props.values.state_number[2]) * 100
    return parseFloat(percent.toFixed(1));
})

const router = useRouter();
const goAchievementScoring = (id: number) => {
    router.push({
        name: '课程详情-任务管理-成果打分',
        params: { taskId: id },
        query: { type: 'task' }
    })
}

//修改发布任务窗口状态
const visible1 = ref<boolean>(false);
//窗口模块
const [modal, contextHolder] = Modal.useModal();
const showDeleteConfirm = (task_name: string) => {
    modal.confirm({
        title: task_name,
        content: '取消该任务将会一同删除有关该任务的提交文件等内容。',
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
const showTaskDescrition = (task: task) => {
    modal.info({
        title: task.task_name,
        content: task.task_description,
        maskClosable: true,
        okText: '确认',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}
</script>
<style scoped>
.card {
    display: flex;
    align-items: center;
    padding: 1%;
    border: 1px solid #aaa;
    margin: 1%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;

}

.card:hover {
    cursor: pointer;
    background-color: rgb(237, 238, 239);
    transform: translateY(-3px);
    box-shadow: 0 4px 8px 0 rgba(24, 23, 25, 0.2);
    transition: all 0.2s;
    transform: scale(1.01);
}

.icon {
    color: rgb(22, 119, 255);
    width: 57px;
    height: 57px;
}

.massage {
    display: flex;


    width: 60%;
}

.progress {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    margin-right: 2%;
}

.operate {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    height: 100px;
}

.operate:hover {
    cursor: default;
}
</style>