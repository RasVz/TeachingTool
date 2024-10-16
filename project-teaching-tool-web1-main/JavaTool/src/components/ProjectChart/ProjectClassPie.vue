<template>
  <div class="chart-container" style="border-radius: 8px 8px 0 0; height: 100%;">
    <div class="ant-table-title">
      项目完成详情
    </div>
    <div ref="chartDom" class="chart-content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

let chartDom = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;

const initChart = () => {
  if (chartDom.value) {
    myChart = echarts.init(chartDom.value);
    const option: EChartsOption = {
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        data: ['进行中', '待验收', '已归档', '未启动', '未领取'],
      },
      series: [
        {
          name: '我的任务',
          type: 'pie',
          radius: '45%',
          data: [
            { value: 5, name: '进行中' },
            { value: 6, name: '待验收' },
            { value: 3, name: '已归档' },
            { value: 2, name: '未启动' },
            { value: 1, name: '未领取' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
};

onMounted(async () => {
  await nextTick();
  initChart();
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  // 移除resize事件监听
  window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
  if (myChart) {
    myChart.resize();
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  border: none; /* 移除边框 */
  margin-bottom: 33px;
}

.chart-content {
  width: 100%;
  padding: 2px;
  height: 90%;
}

.ant-table-title {
  background-color: #007bff; /* 背景颜色为蓝色 */
  color: #ffffff; /* 文字颜色为白色 */
  padding: 10px 16px; /* 上下内边距为 10 像素，左右内边距为 16 像素 */
  border-bottom: 1px solid #f0f0f0; /* 底部边框 */
  font-size: large; /* 字体大小 */  
  text-align: left; /* 文字左对齐 */
  position: relative; /* 确保绝对定位的子元素的相对定位 */
  top: 0; /* 顶部对齐 */
  width: 95%;
  margin: auto;
  margin-bottom: 30px;
  margin-top: 25px;
  text-align: center;
}
</style>
