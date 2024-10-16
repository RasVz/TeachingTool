<template>
    <div class="card" @click="goAchievementScoring(1)">
        <div style="margin:0 2% 0 2%;">
            <SvgIcon name='group' class="icon"></SvgIcon>
        </div>

        <div class="massage">
            <span style="font-size: 20px;">
                {{ props.values.teamName }}
            </span>

            <span style="margin-top: 2.5%;">
                小组组长 :
                <span style="margin-left : 2%;">
                    {{ props.values.teamLeader }}
                </span>
            </span>
            <span style="margin-top: 2.5%;">
                所属项目 :
                <span style="margin-left: 2%;">{{ props.values.projectName }}-{{ props.values.moduleName }}</span>
            </span>

        </div>

        <div style="width: auto;" class="progress">
            <div style="display: flex; flex-direction: column;margin: 0 15px;">
                <a-progress type="dashboard" :percent="unFinish" :stroke-color="{
                    '0%': '#108ee9',
                    '100%': '#108eee',
                }" />
                <span style="text-align: center;margin-top: -10%;">
                    {{ props.values.stateNumber[1] }}/{{ props.values.stateNumber[0] }}</span>
                <span style="text-align: center;margin-top: 1%;">已提交</span>
            </div>
            <div style="display: flex; flex-direction: column;margin: 0 15px;">
                <a-progress type="dashboard" :percent="unReviewed" :stroke-color="{
                    '0%': '#108ee9',
                    '100%': '#108eee',
                }" />
                <span style="text-align: center;margin-top: -10%;">{{ props.values.stateNumber[3] }}/{{
                    props.values.stateNumber[2] }}</span>
                <span style="text-align: center;margin-top: 1%;">已批阅</span>
            </div>

        </div>

        <div class="operate">
        </div>

    </div>

</template>
<script lang="ts" setup>

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'ant-design-vue';





interface team {
    teamId: number;//小组id 唯一标识符
    teamName: string;//小组名称
    teamLeader: string;
    projectName: string;//所在项目名称
    moduleName: string;//所在项目模块名称
    stateNumber: number[];//任务的状态数量0：全部数量 ，1：未完成， 2：已完成，3：带批阅
}

//modelVisible用于开关窗口
const props = defineProps({
    values: {
        type: Object as () => team,
        default: false
    },
})
const emit = defineEmits(['update:modelVisible']);

// 设置传值数据
// 未完成数量
const unFinish = computed(() => {
    const percent = (props.values.stateNumber[1] / props.values.stateNumber[0]) * 100
    return parseFloat(percent.toFixed(1));
})
//未批阅数量
const unReviewed = computed(() => {
    const percent = (props.values.stateNumber[3] / props.values.stateNumber[2]) * 100
    return parseFloat(percent.toFixed(1));
})

const router = useRouter();
const goAchievementScoring = (id: number) => {
    router.push({
        name: '课程详情-任务管理-成果打分',
        params: { taskId: id },
        query: { type: 'team' }
    })
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
    flex-direction: column;
    margin-right: 2%;
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