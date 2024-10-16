<template>
  <div class="announcement-container">
    <div class="announcement-title">
      <h3>小组公告</h3>
    </div>
    <div class="announcement-list">
      <div
        class="announcement-item"
        v-for="(announcement, index) in displayedAnnouncements"
        :key="index"
        @click="showModal(announcement.title, announcement.content)"
      >
        <p>{{ announcement.title }}: {{ announcement.content }}</p>
      </div>
    </div>
    <div class="view-all">
      <a href="#" @click.prevent="showAllAnnouncements">查看全部公告</a>
    </div>

    <!-- Modal for single announcement -->
    <a-modal v-model:open="isModalVisible" :width="600" :footer="null" @cancel="closeModal">
      <template #title>{{ modalTitle }}</template>
      <div style="max-height: 300px; overflow-y: auto">
        <p>{{ modalContent }}</p>
      </div>
    </a-modal>

    <!-- Modal for all announcements -->
    <a-modal
      v-model:open="isAllAnnouncementsVisible"
      :width="800"
      :footer="null"
      @cancel="closeAllAnnouncementsModal"
    >
      <template #title>全部公告</template>
      <div style="max-height: 500px; overflow-y: auto">
        <div
          v-for="(announcement, index) in announcements"
          :key="'all-' + index"
          class="announcement-item"
          @click="showModal(announcement.title, announcement.content)"
        >
          <p>{{ announcement.title }}: {{ announcement.content }}</p>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const isModalVisible = ref(false);
const modalTitle = ref('');
const modalContent = ref('');

const isAllAnnouncementsVisible = ref(false);

const announcements = ref([
  { title: '公告1', content: '公告1内容' },
  { title: '公告2', content: '公告2内容' },
  { title: '公告3', content: '公告3内容' },
  { title: '公告4', content: '公告4内容' },
  { title: '公告5', content: '公告5内容' },
  { title: '公告6', content: '公告6内容' },
  { title: '公告7', content: '公告7内容' },
  { title: '公告8', content: '公告8内容' },
  { title: '公告9', content: '公告9内容' },
  { title: '公告10', content: '公告10内容' }
]);

// 计算属性：用于显示前3个公告
const displayedAnnouncements = computed(() => announcements.value.slice(0, 8));

const showModal = (title: string, content: string) => {
  modalTitle.value = title;
  modalContent.value = content;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const showAllAnnouncements = () => {
  isAllAnnouncementsVisible.value = true;
};

const closeAllAnnouncementsModal = () => {
  isAllAnnouncementsVisible.value = false;
};
</script>
<style scoped>
.announcement-container {
  background-color: #ffffff;
  border-radius: 10px;
}

.announcement-title {
  background-color: #4e69c2; /* 橙色背景 */
  padding: 5px;
  text-align: center;
  margin: 0;
  font-size: 1rem;
  color: #fff; /* 白色字体 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
}

.announcement-title h3 {
  margin: 0;
  font-size: 1rem;
}

.announcement-list {
  padding: 0;
}

.announcement-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.announcement-item:hover {
  background-color: #f5f5f5;
}

.view-all {
  text-align: right;
  padding: 8px;
}

.view-all a {
  color: #1890ff; /* 链接颜色 */
  text-decoration: none;
}

.view-all a:hover {
  text-decoration: underline;
}
</style>
