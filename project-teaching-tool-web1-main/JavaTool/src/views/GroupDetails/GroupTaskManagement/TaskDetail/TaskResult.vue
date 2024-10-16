<template>
  <div class="all">
    <div class="header">
      <a-button class="buttonFront">上一个</a-button>
      <div>
        <ul class="header-info">
          <li>{{ taskName }}</li>
          <li>提交时间: {{ submissionDate }}</li>
        </ul>
      </div>
      <a-button class="buttonNext">下一个</a-button>
    </div>
    <div class="content">
      <div class="Deliverables">
        <div class="DeliverablesTabeleTitle">交付物</div>
        <div class="DeliverablesTabele">
          <template v-for="(item, index) in Deliverables" :key="index">
            <ol class="deliverable-item">
              <li class="deliverable-header">
                <span>{{ index + 1 + '、' + item.Deliverablesname }}</span>
              </li>
              <li>
                <span>
                  成果名称：
                  <a>{{ item.Achievementname }}</a>
                </span>
              </li>
            </ol>
          </template>
        </div>
      </div>
      <div class="Scoring">
        <div class="Score">
          <span>得分：</span>
          <span class="score-value">{{ score }}</span> 分
        </div>
        <div class="Comments">
          评语：
          <span class="Comments-text">
            {{ comments }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';

// 任务数据
const taskName = '开发新功能';
const submissionDate = '2024-8-31';
const score = 100;

// 评语
const comments = ref(
  '这是一条示例评语。这是一条示例评语。这里是详细的评语，它可能很长，所以需要限制它的大小。这里是详细的评语，它可能很长，所以需要限制它的大小。这里是详细的评语，它可能很长，所以需要限制它的大小。这里是详细的评语，它可能很长，所以需要限制它的大小。'
);

// 交付物数据
const Deliverables = reactive([
  {
    Deliverablesname: '前端设计报告',
    Achievementname: '前端设计报告-第一小组'
  },
  {
    Deliverablesname: '后端开发报告',
    Achievementname: '后端开发报告-第二小组'
  },
  {
    Deliverablesname: '后端开发报告',
    Achievementname: '后端开发报告-第二小组'
  },
  {
    Deliverablesname: '后端开发报告',
    Achievementname: '后端开发报告-第二小组'
  },
  {
    Deliverablesname: '后端开发报告',
    Achievementname: '后端开发报告-第二小组'
  }
]);
</script>
<style scoped>
.all {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1.5%;
  margin: 1%;
}

.header {
  width: 92%;
  background-color: #cce5ff;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info {
  list-style-type: none;
  line-height: 100%;
  margin-bottom: 0;
  text-align: center;
  padding: 0;
}

.buttonFront,
.buttonNext {
  margin: 0 6%;
}

.content {
  display: flex;
  width: 90%;
}

.Deliverables {
  flex: 3;
  margin: 1%;
  display: flex;
}

.DeliverablesTabeleTitle {
  writing-mode: vertical-rl;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #67aef7;
  color: aliceblue;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 10px;
}

.DeliverablesTabele {
  flex: 20;
  max-height: 300px;
  overflow-y: auto;
}

.deliverable-item {
  list-style-type: none;
  line-height: 50px;
  margin-bottom: 0;
  padding: 0;
  font-size: 14px;
}

.deliverable-header {
  background-color: #e3f1ff;
  padding: 0 2%;
}

.Scoring {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 使内容垂直居中 */
  margin-left: 4%;
  font-size: 14px;
}

.score-value {
  color: red;
  font-size: 30px;
}

.Comments {
  margin-top: 3%;
  width: 100%;
}

.Comments-text {
  display: block;
  max-height: 200px;
  width: 100%;
  border: 1px solid #afdaeb;
  border-radius: 8px;
  padding: 12px;
  background-color: #f9f9f9;
  overflow-y: auto;
  line-height: 2;
  margin-top: 8px;
}
</style>
