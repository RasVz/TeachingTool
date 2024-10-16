<template>

  <div :style="{ width: '100%', height: '100%' }" style=" border: 1px solid #f0f0f0;margin: 0 5px;
     border-radius: 8px 8px 0 0;">
    <div class="ant-table-title">
      任务概述
    </div>
    <div ref="chartDom" :style="{ width: '100%', height: '80%' }" style="padding: 5px;"></div>
  </div>


</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';

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
let chartDom = ref();
const initChart = () => {

  if (chartDom.value) {

    var myChart = echarts.init(chartDom.value);
    var option: EChartsOption;
    option = {
      title: {
        // text: 'Referer of a Website',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '我的任务',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1, name: '进行中' },
            { value: 1, name: '已结束' },
            { value: 1, name: '已归档' },
            { value: 1, name: '未启动' },

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

    option && myChart.setOption(option);
  }
};

onMounted(async () => {
  // 等待 DOM 更新完成
  await nextTick();

  // 初始化图表
  initChart();
});
</script>
<script lang="ts">
export default {
  name: 'TaskPie'
};
</script>
<style scoped>
/* 添加一些CSS样式来美化图表容器（可选） */

.ant-table-title {

  padding: 16px 16px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 10px;
  height: 55px;
}
</style>