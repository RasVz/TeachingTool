<template>
  <div class="head">
    <a-radio-group v-model:value="statusFilter" button-style="solid">
      <a-space size="middle">
        <a-radio-button value="">全部任务</a-radio-button>
        <a-radio-button value="进行中">进行中的任务</a-radio-button>
        <a-radio-button value="未完成">未完成任务</a-radio-button>
        <a-radio-button value="已完成">已完成任务</a-radio-button>
        <a-radio-button value="已归档">已归档任务</a-radio-button>
        <a-badge :count="5">
          <a-radio-button value="待领取">领取任务</a-radio-button>
        </a-badge>
      </a-space>
      <div style="display: flex; align-items: center; float: right">
        <a-button
          type="primary"
          @click="publishTask"
          style="margin-right: 10px; background-color: green"
        >
          发布任务
        </a-button>
        <CreateTask />
      </div>
    </a-radio-group>
  </div>

  <div class="body">
    <GroupTaskTable />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import GroupTaskTable from './GroupTaskTable.vue';

const statusFilter = ref<string>('');
</script>

<style scoped>
.head {
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  margin: 1%;
  height: auto;
  /* 使容器高度为视口高度 */
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}

.body {
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  margin: 1%;
  height: 83%;
  min-height: 83%;
  max-height: 83%;
  /* 使容器高度为视口高度 */
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}
</style>
