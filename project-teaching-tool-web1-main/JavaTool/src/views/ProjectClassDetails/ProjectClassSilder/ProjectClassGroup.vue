<template>
  <div class="custom-card">
    <p class="card-text">项目成员：</p>
    <div class="group-list">
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="vertical"
        :items="menuGroups"
        :subMenuOpenDelay=0.3
        @click="handleClick"
        menu
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Card, Menu } from 'ant-design-vue';

const projectStatus = '进行中';
const projectDeadline = '2024年9月1日';
const projectOrganization = '飞元科技有限公司';
const projectArea = '飞元项目区';
const projectAddress = '123';
const projectClass = '飞元1班';

const groups = ref([
  { name: '小组1', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] },
  { name: '小组2', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] },
  { name: '小组3', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] },
  { name: '小组4', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] },
  { name: '小组5', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] },
  { name: '小组6', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] },
  { name: '小组7', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] },
  { name: '小组8', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] },
  { name: '小组9', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] },
  { name: '小组10', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] }
]);

const openKeys = ref([]);
const selectedKeys = ref([]);

const menuGroups = computed(() =>
  groups.value.map((group) => ({
    key: group.name,
    label: group.name,
    title: group.name,
    children: group.members.map((member, index) => ({
      key: `${group.name}-成员${index + 1}`,
      label: member,
      title: member
    }))
  }))
);

const handleClick = (menuInfo) => {
  console.log('click ', menuInfo);
};
</script>

<style scoped>
.custom-card {
  width: 100%;
  height: 50%;
  padding: 1px;
}

.card-text {
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
  align-items: center;
}

.group-list {
  position: relative;
  width: 100%;
  height: 100%;
  color: #000;
  border-radius: 10px;
  max-height: 200px; /* 设置最大高度 */
  overflow-y: auto; /* 使内容可滚动 */
}

.status-content {
  text-align: center;
  white-space: pre-wrap;
  line-height: 3;
  font-weight: normal;
  font-size: 1.5ch;
}
</style>
