<template>
  <div style="height: 97%">
    <div class="head">
      <a-select
        ref="select"
        :field-names="{ label: 'class_name', value: 'class_id' }"
        v-model:value="class_id"
        style="width: 120px"
        :options="classOptions"
      ></a-select>
      <div>
        <a-button type="primary">一律下载</a-button>
      </div>
    </div>

    <div class="body">
      <TaskResultsTable :statusFilter="statusFilter" :classId="class_id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TaskResultsTable from './TaskResultsTable.vue';
import type { SelectProps } from 'ant-design-vue';

const statusFilter = ref<string>('');

const class_id = ref('1');
const classOptions = ref<SelectProps['options']>([
  {
    class_id: '1',
    class_name: '1班'
  },
  {
    class_id: '2',
    class_name: '2班'
  }
]);
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  padding: 1.5%;
  margin: 1%;
  height: auto;
  max-width: 100%;
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
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}
</style>
