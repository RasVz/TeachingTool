<template>
  <div class="head">
    <a-radio-group v-model:value="statusFilter" button-style="solid">
      <a-space size="middle">
        <a-radio-button value="进行中">小组成果</a-radio-button>
        <a-radio-button value="未完成">个人成果</a-radio-button>
      </a-space>
      <div style="margin-right: 25px; float: right">
        <a-button type="primary" @click="visible1 = true">一律下载</a-button>
      </div>
    </a-radio-group>
  </div>

  <div class="body">
    <AllFile :statusFilter="statusFilter" @select-all="handleSelectAll" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AllFile from './AllFile.vue';

const statusFilter = ref<string>('');

const handleSelectAll = () => {
  console.log('全选处理');
};
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
