<template>
  <!-- 筛选栏 -->
  <a-form
    ref="formRef"
    :model="formState"
    name="select"
    autocomplete="off"
    layout="inline"
    :label-col="labelCol"
    style="padding: 5px; display: flex; justify-content: space-between; align-items: center"
  >
    <div style="width: 100%; display: flex; justify-content: space-between">
      <div style="display: flex; flex-wrap: wrap; width: 85%">
        <a-form-item label="小组名称" name="group_Name" style="padding: 5px">
          <a-input v-model:value="formState.taskName" placeholder="输入小组名称" />
        </a-form-item>
        <a-form-item label="所属课程" name="groupName" style="padding: 5px">
          <a-input v-model:value="formState.groupName" placeholder="输入所属课程名称" />
        </a-form-item>
      </div>
      <div style="display: flex; width: auto">
        <a-button
          style="margin-right: 10px; margin-top: 5px"
          type="primary"
          :icon="h(SearchOutlined)"
          @click="onSubmit"
          >查询</a-button
        >
        <a-button
          style="margin-right: 5px; margin-top: 5px"
          :icon="h(RedoOutlined)"
          @click="resetForm"
          >重置</a-button
        >
      </div>
    </div>
  </a-form>

  <!-- 表格 -->
  <div style=" ">
    <a-table
      :columns="columns"
      :data-source="data"
      :bordered="true"
      :loading="loading"
      :pagination="false"
      :scroll="{ y: '45vh' }"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'group_name'">
          <a @click="viewgroupDetail()">{{ text }}</a>
        </template>
        <template v-else-if="column.dataIndex === 'operate'">
          <a>解散小组</a>
        </template>
      </template>
    </a-table>
  </div>
  <a-pagination
    v-model:current="current"
    :total="500"
    style="text-align: center; bottom: 0%; margin-top: 1%"
  />
</template>
<script lang="ts" setup>
import router from '@/router';
import { onMounted, ref, reactive, h } from 'vue';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import type { FormInstance } from 'ant-design-vue';
dayjs.locale('zh-cn');
//表单对应数据接口
interface FormState {
  taskName: string;
  groupName: string;
  taskDate: [dayjs.Dayjs, dayjs.Dayjs];
}
const labelCol = { style: { width: '90px' } };
//表单对应数据
const formState = reactive<FormState>({
  taskName: '',
  groupName: '',
  taskDate: [null, null]
});

//表单Ref
const formRef = ref<FormInstance>();

//提交筛选内容
const onSubmit = () => {
  console.log(formState);
};
//清空筛选框内容
const resetForm = () => {
  formRef.value.resetFields();
};
const current = ref(6);
const columns = ref(null);
const data = ref(null);
const loading = ref(true);
onMounted(() => {
  loading.value = false;
  columns.value = [
    {
      title: '小组名称',
      dataIndex: 'group_name',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '组长',
      dataIndex: 'group_mannerName',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '成员数',
      dataIndex: 'group_member',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '所属课程',
      dataIndex: 'group_course',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center' as 'center',
      className: 'custom-header-style',

      customHeaderCell: () => {
        return {
          style: { textAlign: 'center' as 'center' } //表头单
        };
      }
    }
  ];

  data.value = [
    {
      group_id: '1',
      group_name: '第一小组',
      group_mannerName: '张一',
      group_member: '48',
      group_course: '软件工程导论'
    },
    {
      group_id: '2',
      group_name: '第二小组',
      group_mannerName: '张二',
      group_member: '48',
      group_course: '软件工程导论'
    },
    {
      group_id: '3',
      group_name: '第三小组',
      group_mannerName: '张三',
      group_member: '48',
      group_course: '软件工程导论'
    },
    {
      group_id: '4',
      group_name: '第四小组',
      group_mannerName: '张四',
      group_member: '48',
      group_course: '软件工程导论'
    },
    {
      group_id: '5',
      group_name: '第五小组',
      group_mannerName: '张五',
      group_member: '48',
      group_course: '软件工程导论'
    }
  ];
});

function viewgroupDetail() {
  let routeUrl = router.resolve({
    name: 'GroupDetail',
    params: { id: 4 }
  });
  window.open(routeUrl.href, '_blank');
}
</script>

<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}

a {
  font-size: 14px;
  color: #61666d;
}

a:hover {
  color: #00aeec;
}

:deep(.ant-table-thead th.custom-header-style) {
  font-size: 14px;
  font-weight: 550;
  background-color: rgb(233, 232, 236);
}

:deep(.ant-table-cell.custom-header-style) {
  font-size: 14px;
}
</style>