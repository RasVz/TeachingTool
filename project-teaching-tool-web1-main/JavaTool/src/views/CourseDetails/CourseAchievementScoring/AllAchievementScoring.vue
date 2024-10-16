<template>
    <!-- 筛选栏 -->
    <a-form ref="formRef" :model="formState" name="select" autocomplete="off" layout="inline" :label-col="labelCol"
        style="padding: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;">
        <div style="width: 100%; display: flex; justify-content: space-between;">
            <div style="display: flex;  flex-wrap: wrap; width: 85%;">
            </div>
        </div>
    </a-form>
    <!-- 表格 -->
    <div style="height: 100%;display: flex; flex-direction: column;">

        <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" :bordered="true"
            :loading="loading" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <template v-for="item in record.name" :key="item">
                        {{ item.studentName }} &#8197
                    </template>
                </template>
                <template v-if="column.key === 'fileName'">
                    <template v-for="item in record.fileName" :key="item">
                        {{ item }} &#8197
                    </template>
                </template>
                <template v-if="column.key === 'Completion'">
                    <template v-if="record.Completion == '已完成'">
                        <div style="display: flex; height: 100%;">
                            <p class="dotClass" style="background-color: green;"></p><span>{{ record.Completion
                                }}</span>
                        </div>
                    </template>
                    <template v-if="record.Completion == '进行中'">
                        <div style="display: flex; height: 100%;">
                            <p class="dotClass" style="background-color: blue;"></p><span>{{ record.Completion }}</span>
                        </div>
                    </template>
                    <template v-if="record.Completion == '已超时'">
                        <div style="display: flex; height: 100%;">
                            <p class="dotClass" style="background-color: red;"></p><span>{{ record.Completion }}</span>
                        </div>

                    </template>
                    <template v-if="record.Completion == '待领取'">
                        <div style="display: flex; height: 100%;">
                            <p class="dotClass" style="background-color: yellow;"></p><span>{{ record.Completion
                                }}</span>
                        </div>
                    </template>
                </template>
                <template v-if="column.key === 'action'">
                    <span class="a-style">
                        <a @click="goTaskDetail(1)">详情</a>
                    </span>
                    <a-divider type="vertical" />
                    <span class="a-style">
                        <a @click="openNotification('top')">打回</a>
                    </span>
                    <a-divider type="vertical" />
                    <span class="a-style">
                        <a>催促</a>
                    </span>
                </template>
                <template v-if="column.key === 'score'">
                    <a-input-number :controls="false" min="0" max="100" v-model:value="record.score"
                        style="width: 50px;" @search="onSearch(record.score, record.studentid)" />
                </template>
            </template>
        </a-table>
    </div>
</template>

<script lang="ts" setup>

import { ref, watch } from 'vue';
import { FormInstance, TableProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { NotificationPlacement } from 'ant-design-vue/es/notification/interface';
import { notification } from 'ant-design-vue';
import { h } from 'vue';
import { SmileOutlined } from '@ant-design/icons-vue';
interface formState {
    taskName: string
    groupName: string
    score: { id: number, score: number }
}

const formState = ref<formState>({
    taskName: '',
    groupName: '',
    score: null
});

const formRef = ref<FormInstance>();
const labelCol = { style: { width: '90px' } };
//加载
const loading = ref(false);
const router = useRouter();
const name = ref([
    {
        studentName: '张三',
        studentId: '202210098088'
    }, {
        studentName: '李四',
        studentId: '202210098089'
    }
])
const fileName = ref([
    '《计算机组成原理》', '《计算机组成原理》', '《计算机组成原理》', '《计算机组成原理》', '《计算机组成原理》'
])

const props = defineProps({
    Tasktype: {
        type: String,
        default: ''
    }
})
const type = ref(true);
if (props.Tasktype == 'team') {
    type.value = true
} else {
    type.value = false
}
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 170
    },
    {
        title: type.value ? '所在小组' : '所属任务',
        dataIndex: type.value ? 'group' : 'task',
        key: type.value ? 'group' : 'task',
        fixed: 'left',
        width: 90
    },
    {
        title: '交付物名',
        dataIndex: 'fileName',
        key: 'fileName',

    },

    {
        title: '提交时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
    },
    {
        title: '截止时间',
        dataIndex: 'endTime',
        key: 'endTime',
    }, {
        title: '完成情况',
        dataIndex: 'Completion',
        key: 'Completion',
        width: 100
    },
    {
        title: '评分',
        dataIndex: 'score',
        key: 'score',
        width: 80
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 180
    },
];

const data = [
    {
        studentId: 2020211001,
        key: 1,
        fileName: fileName.value,
        group: '第二小组',
        task: '任务1',
        name: name.value,
        Completion: '已完成',
        updateTime: '2024年8月6日15:36:50',
        endTime: '2024年8月6日15:37:16',
        score: 30
    },
    {
        studentId: 2020211002,
        key: 2,
        fileName: '《计算机组成原理》',
        name: '',
        Completion: '进行中',
        group: '第二小组',
        updateTime: '2024年8月6日15:37:02',
        endTime: '2024年8月6日15:37:16',
        score: 1
    },
    {
        studentId: 2020211003,
        key: 3,
        fileName: '《c#》',
        name: '',
        Completion: '已超时',
        group: '第三小组',
        updateTime: '2024年8月6日15:37:16',
        endTime: '2024年8月6日15:37:16',
        score: 1
    },
    {
        studentId: 2020211003,
        key: 3,
        fileName: '《c#》',
        name: '',
        Completion: '待领取',
        group: '第三小组',
        updateTime: '2024年8月6日15:37:16',
        endTime: '2024年8月6日15:37:16',
        score: 1
    },
];



//输入成绩
const onSearch = (searchValue: number, searchid: number) => {
    console.log('id', searchid);
    console.log('searchValue', searchValue);
};


const getSelectedRowKeys = ref<string[]>([]);
const rowSelection: TableProps['rowSelection'] = {
    onChange: (selectedRowKeys: string[]) => {
        getSelectedRowKeys.value = selectedRowKeys;
    },
};
const emit = defineEmits(['updateSelected']);
watch(getSelectedRowKeys, (newVal) => {
    emit('updateSelected', newVal);
});

const goTaskDetail = (id) => {

    router.push({
        name: '课程详情-任务管理-任务详情',
        params: {
            taskId: id,
        },
        //任务id .小组id
        query: {
            dataArray: JSON.stringify(data),  // 序列化对象数组
        }
    });
}

const openNotification = (placement: NotificationPlacement) => {
    notification.open({
        message: `提示`,
        description:
            '打回成功',

        placement,
        icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
    });
};
</script>


<style scoped>
/* 表格样式 */

.dotClass {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    margin-top: 9%;
    margin-right: 10%;
}

.data-table {
    flex: 1;
    /* 使表格占满剩余空间 */
    margin-top: 10px;
    font-size: 18px;
    border-radius: 8px;

}

.font-size {
    font-size: 18px;
}

.a-style {
    font-size: 18px;
}
</style>