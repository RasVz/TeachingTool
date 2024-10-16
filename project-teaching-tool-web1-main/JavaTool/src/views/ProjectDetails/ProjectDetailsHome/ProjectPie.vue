<template>

    <div class="page-content">
        <h4>
            项目概述
        </h4>
        <div ref="chartDom" style="width:100% ;height: 100%"></div>
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
let myChart = null;
const initChart = () => {

    if (chartDom.value) {

        myChart = echarts.init(chartDom.value);
        var option: EChartsOption;
        option = {
            title: {
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'horizontal',
                left: 'center'
            },
            series: [
                {
                    name: '项目任务',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1, name: '进行中' },
                        { value: 1, name: '已结束' },
                        { value: 1, name: '已归档' },
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

        option && myChart.setOption(option);
    }
};

// onMounted(async () => {
//     // 等待 DOM 更新完成
//     await nextTick();

//     // 初始化图表
//     initChart();
// });
const resizeChart = () => {
    console.log("Resizing chart...");
    if (myChart) {
        myChart.resize();
    }
};

window.addEventListener('resize', resizeChart);
onMounted(() => {
    nextTick().then(() => {
        initChart();
    });
});
</script>
<script lang="ts">
export default {
    name: 'ProjectPie'
};
</script>
<style scoped>
/* 添加一些CSS样式来美化图表容器（可选） */
h4 {
    font-size: 1rem;
    /* 增加字号 */
    color: white;
    /* 使用深色字体 */
    margin-bottom: 12px;
    /* 增加标题与内容之间的距离 */
    background-color: #66b0c2;
    /* 橙色背景 */
    padding: 5px;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    /* 添加阴影效果 */
}

.ant-table-title {

    padding: 16px 16px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 10px;
    height: 55px;
}


.page-content {
    height: 250px;
    width: 100%;

}
</style>
