<template>
    <div>
        <a-modal v-model:open="visible.value" title="任务详情" ok-text="确认" cancel-text="取消" @ok="onOk" @cancel="
        emit('update:modelVisible', false);" :maskClosable="false" width="1000px">
            <a-descriptions :title="props.values.taskName" :bordered="true" >
                <a-descriptions-item label="所属项目">{{ props.values.projectName }}</a-descriptions-item>
                <a-descriptions-item label="所属模块">{{ props.values.moduleName }}</a-descriptions-item>
                <a-descriptions-item label="任务状态">  <a-badge status="processing" :text="props.values.taskStatus" /></a-descriptions-item>
                <a-descriptions-item label="任务描述" :span="3">
                                  {{ props.values.taskDescription }}
                </a-descriptions-item>
                <a-descriptions-item label="创建时间">{{ props.values.createTime.format('YYYY年MM月DD日 HH:mm:ss')  }}</a-descriptions-item>
                <a-descriptions-item label="结束时间" :span="2">{{ props.values.endTime.format('YYYY年MM月DD日 HH:mm:ss')  }}</a-descriptions-item>
                <a-descriptions-item label="领取时间">{{ props.values.startTime.format('YYYY年MM月DD日 HH:mm:ss')  }}</a-descriptions-item>
                <a-descriptions-item label="提交时间" :span="2">{{ props.values.finishTime.format('YYYY年MM月DD日 HH:mm:ss')  }}</a-descriptions-item>
                <a-descriptions-item label="综合评分">  {{ props.values.managerScore}}</a-descriptions-item>
                <a-descriptions-item label="教师评分">  {{ props.values.teacherScore}}</a-descriptions-item>
                <a-descriptions-item label="经理评分">  {{ props.values.managerScore}}</a-descriptions-item>
                <template v-for="(achievement,index) in props.values.achievement" :key="achievement.achievementId">
                <a-descriptions-item :label="'任务要求'+(index+1)" :span="1">
                 {{ props.values.achievement[index].deliverableName }}
                </a-descriptions-item>
                <a-descriptions-item :label="'交付物' +(index+1) " :span="2">
                    {{ props.values.achievement[index].achievementName}}
                </a-descriptions-item>
               </template>
                

           
            </a-descriptions>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>

import { Dayjs } from 'dayjs';
import { ref,computed } from 'vue';

interface Values {
    taskName:string;
    projectName:string;
    moduleName:string;
    taskStatus:string;
    taskDescription:string;
    createTime:Dayjs;
    endTime:Dayjs;
    startTime:Dayjs;
    finishTime:Dayjs;
    achievement:achievement[];
    teacherScore:number;
    managerScore:number;
}
interface achievement{
    achievementId:number;
    deliverableName:string;
    achievementName:string;
}

const props = defineProps({
    modelVisible: {
        type: Boolean,
        default: false
    },
    values:{
        type:Object as ()=> Values,

    }
})

const emit = defineEmits(['update:modelVisible']);



const visible = computed(() => {
    return ref(props.modelVisible)
});





const onOk = () => {
  
            emit('update:modelVisible', false);
         
};
</script>
<style scoped>

</style>