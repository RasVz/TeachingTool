<template>
  <h3>最近提交文档</h3>
  <div class="DataCabinet">
    <a-list class="list" size="small" bordered :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item class="list-item">
          <template #actions>
            <a key="list-loadmore-edit" class="action-link">下载</a>
            <a key="list-loadmore-more" class="action-link">查看</a>
          </template>
          {{ item }}
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
const data: string[] = [
  '前端设计概要文档.txt',
  '需求分析文档.txt',
  '需求分析文档.txt',
  '需求分析文档.txt',
  '需求分析文档.txt',
  '需求分析文档.txt',
  '需求分析文档.txt',
  '需求分析文档.txt',
  '需求分析文档.txt'
];
</script>

<style scoped>
h3 {
  background-color: #e66;
  padding: 5px;
  text-align: center;
  margin: 0;
  font-size: 1rem;
  color: #fff;
}

.DataCabinet {
  height: 100%;
  overflow-y: auto; /* 内容超出时显示滚动条 */
}

.list {
  border: none;
}

.list-item {
  font-size: 0.8rem;
  border-bottom: 1px solid #ddd;
}

.list-item:hover {
  background-color: #f0f0f0;
}

.action-link {
  color: #1890ff;
}

.action-link:hover {
  color: #40a9ff;
}
</style>
