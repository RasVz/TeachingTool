<template>
    <div class="DataCabinet-container">
        <h4>最近提交文档</h4>
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
.DataCabinet-container {
    text-align: center;
    height: 100%;
    width: 100%;
}

.DataCabinet {
    border-radius: 8px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 100%;
    height: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    /* 背景色设置为白色 */
}

h4 {
    font-size: 1rem;
    /* 增加字号 */
    color: white;
    /* 使用深色字体 */
    margin-bottom: 12px;
    /* 增加标题与内容之间的距离 */
    background-color: #e66;
    /* 橙色背景 */
    padding: 5px;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    /* 添加阴影效果 */
}

.list {
    height: 30vh;
    overflow: auto;
    border: none;
    /* 移除列表的边框 */
}

.list-item {
    border-bottom: 1px solid #ddd;
    /* 列表项之间的分隔线 */
}

.list-item:hover {
    background-color: #f0f0f0;
    /* 悬停背景色 */
}

.action-link {
    color: #1890ff;
    /* 链接颜色 */
}

.action-link:hover {
    color: #40a9ff;
    /* 链接悬停颜色 */
}

.demo-loadmore-list {
    min-height: 35vh;
}
</style>