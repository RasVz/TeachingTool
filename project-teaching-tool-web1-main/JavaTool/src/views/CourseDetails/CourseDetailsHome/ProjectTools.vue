<template>
    <div calss="tools-container">
        <div>

            <h4>相关工具栏</h4>


            <div class="tools">
                <a-button class="tools-btn">工具1</a-button>
                <a-button class="tools-btn">工具2</a-button>
                <a-button class="tools-btn">工具3</a-button>
                <a-button class="tools-btn">工具4</a-button>
                <a-button class="tools-btn">工具5</a-button>
            </div>
            <br>

            <h2 align="center">相关消息板</h2>
            <a-textarea v-model:value="value" placeholder="请输入" :rows="3" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref<string>('');
</script>

<style scoped>
.tools {
    padding-left: 20%;
    padding-right: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    max-height: 100px;
    overflow: auto;
}

h4 {
    font-size: 1rem;
    /* 增加字号 */
    color: white;
    /* 使用深色字体 */
    margin-bottom: 12px;
    /* 增加标题与内容之间的距离 */
    background-color: #4e69c2;
    ;
    /* 橙色背景 */
    padding: 5px;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    /* 添加阴影效果 */
}

.tools-btn {
    margin-top: 2%;
}

.tools-container {
    width: 100%;
    height: 100%;

}

:where(.css-dev-only-do-not-override-b92jn9).ant-card .ant-card-body {
    border-radius: 0 0 8px 8px;
}
</style>