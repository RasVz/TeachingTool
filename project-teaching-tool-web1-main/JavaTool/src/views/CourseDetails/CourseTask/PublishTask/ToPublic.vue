<template>
    <div>
        <a-modal v-model:open="visible.value" title="发布任务" ok-text="确认" cancel-text="取消" @ok="onOk" @cancel="formRef.resetFields()
        emit('update:modelVisible', false);" :maskClosable="false">
            <a-form ref="formRef" :model="formState" name="form_in_modal" :rules="rules">
                <a-form-item name="task_name" label="任务名称">
                    <a-input v-model:value="formState.taskName" disabled style="width: 300px" />
                </a-form-item>
                <a-form-item name="proportion" label="任务占比">

                    <a-input-number v-model:value="formState.proportion" style="width: 100px" :min="1" :max="100">
                        <template #addonAfter>%</template>
                    </a-input-number>
                </a-form-item>
                <a-form-item name="projectClass_id" label="发布班级">

                    <a-select v-model:value="formState.teachingClass" mode="multiple" :size="'large'"
                        placeholder="选择班级" @change="handleChange">
                        <a-select-option v-for="projectClass in classOptions" :key="projectClass.classId">
                            {{ projectClass.className }}
                        </a-select-option>

                    </a-select>

                </a-form-item>
                <a-form-item name="team_id" label="发布小组">
                    <a-select v-model:value="formState.team" mode="multiple" :size="'large'" placeholder="选择小组">
                        <a-select-option v-for="team in teamOptions" :key="team.teamId"
                            :disabled="teamId.includes(team.teamId)">
                            {{ team.className }}--{{ team.teamName }}
                        </a-select-option>
                    </a-select>


                </a-form-item>

                <a-form-item label="截至时间" name="endTime">
                    <a-date-picker v-model:value="formState.endTime" show-time :size="'large'" style="width: 100%;" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>

import dayjs from 'dayjs';
import { reactive, ref, toRaw, computed } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { useStore } from 'vuex';
import TaskDao from '@/daos/task_dao';
import TeamDao from '@/daos/team_dao';
const taskDao = new TaskDao()
const teamDao = new TeamDao()
const store = useStore()

interface Values {
    taskId: number;
    taskName: string;
    teachingClass: number[];
    team: number[];
    proportion: number;
    endTime: dayjs.Dayjs

}
interface task {
    task_id: number//任务id
    task_name: string//任务名称
}
interface team {
    teamId: number;//小组id 唯一标识符
    teamName: string;//小组名称
    classId:string;
    className: string;
}
const props = defineProps({
    modelVisible: {
        type: Boolean,
        default: false
    },
    task: {
        type: Object as () => task,
        default: null
    },
    teamHasTask:{
        type: Object as()=> team[],
        default: null
    }
})
const emit = defineEmits(['update:modelVisible']);
const visible = computed(() => {
    return ref(props.modelVisible)
});

const formRef = ref<FormInstance>();

const formState = reactive<Values>({
    taskId: props.task.task_id,
    taskName: props.task.task_name,
    teachingClass: [],
    team: [],
    proportion: null,
    endTime: null
});


//获取课程关联班级
const classOptions = store.getters.teachingClasss

//已发布过的小组
const teamId = computed(() => {
    return props.teamHasTask.map(item => item.teamId);
});

//获取小组选项
const teamOptions = ref();
const handleChange = async(value: number[]) => {
    if(value.length==0){
        teamOptions.value=null
    }
    else{
        let result = await teamDao.findTeamByClassIds(value.join(","));
    teamOptions.value = result.data.data 
 
    }
   
};


const onOk = () => {
    formRef.value
        .validateFields()
        .then(values => {
            console.log('Received values of form: ', values);
            console.log('formState: ', toRaw(formState));
            emit('update:modelVisible', false);
            formRef.value.resetFields();
            console.log('reset formState: ', toRaw(formState));
        })
        .catch(info => {
            console.log('Validate Failed:', info);
        });
};

//表单验证规则
const rules: Record<string, Rule[]> = {
    taskName: [
        { required: true, message: '请输入任务名称', trigger: 'blur' },
    ],
    proportion: [
        { required: true, message: '请选择占比', trigger: 'blur' },
    ],
    team: [
        { required: true, message: '请选择小组', trigger: 'blur' },
    ],
    teachingClass: [
        { required: true, message: '请选择班级', trigger: 'blur' },
    ],
    endTime: [{ required: true, message: '请决定截止日期', trigger: 'blur' }],


};
</script>
<style scoped>
.collection-create-form_last-form-item {
    margin-bottom: 0;
}
</style>