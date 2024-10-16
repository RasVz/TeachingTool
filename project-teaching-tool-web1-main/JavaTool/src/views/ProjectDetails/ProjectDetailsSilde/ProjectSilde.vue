<template>

    <div class="custom-card"> <!-- 使用 Ant Design 的卡片组件 -->
        <div class="card-title">项目名称</div> <!-- 显示项目名称 -->
        <p class="card-text">
            项目状态：
        <div class="status-content">{{ projectStatus }}</div> <!-- 显示项目状态 -->
        </p>
        <p class="card-text">
            项目期限：
        <div class="status-content">{{ projectDeadline }}</div> <!-- 显示项目期限 -->
        </p>
        <p class="card-text">
            所在机构：
        <div class="status-content">{{ projectOrganization }}</div> <!-- 显示项目所在的机构 -->
        </p>
        <p class="card-text">
            项目区：
        <div class="status-content">{{ projectArea }}</div> <!-- 显示项目区 -->
        </p>
        <p class="card-text">
            项目地址：
        <div class="status-content">{{ projectAddress }}</div> <!-- 显示项目地址 -->
        </p>
        <p class="card-text">
            项目班：
        <div class="status-content">{{ projectClass }}</div> <!-- 显示项目班级 -->
        </p>

        <div class="Menu">
            <ProjectMenu />
        </div>
    </div>


</template>

<script setup lang="ts">
import ProjectMenu from './ProjectMenu.vue'
import { ref, computed } from 'vue'; // 导入 ref 和 computed 函数
import { Card, Menu } from 'ant-design-vue'; // 导入 Ant Design 的 Card 和 Menu 组件

// 定义响应式数据
const projectStatus = ref('进行中');
const projectDeadline = ref('2024年9月1日');
const projectOrganization = ref('飞元科技有限公司');
const projectArea = ref('飞元项目区');
const projectAddress = ref('123');
const projectClass = ref('飞元1班');
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
    { name: '小组10', members: ['成员1', '成员2', '成员3', '成员4', '成员5', '成员6', '成员7'] },
]);
const openKeys = ref([]);
const selectedKeys = ref([]);

// 计算属性
const menuGroups = computed(() => {
    return groups.value.map(group => ({
        key: group.name,
        label: group.name,
        title: group.name,
        children: group.members.map((member, index) => ({
            key: `${group.name}-成员${index + 1}`,
            label: member,
            title: member
        })),
    }));
});

// 方法
function handleClick(menuInfo) {
    console.log('click ', menuInfo);
}


</script>


<style scoped>
.custom-card {
    width: 100%;
    padding: 1px;
}

.card-title {
    text-align: center;
    /* 设置标题居中显示 */
    border-bottom: 1px solid #000;
    /* 设置标题下方的边框为1px的黑色实线 */
    padding: 10px 0;
    /* 设置标题的内边距为10px */
    font-size: 30px;
    /* 设置标题的字体大小为30px */
}

.card-text {
    font-size: 20px;
    /* 设置文本的字体大小为20px */
    font-weight: bold;
    /* 设置字体为粗体 */
    margin: 5px;
    /* 设置文本的外边距为10px */
    /* 设置文本下方的外边距为20px */
    align-items: center;
    /* 在竖直方向上居中对齐内容 */
    max-height: 100px;
}

p {
    margin: 0;
    /* 设置段落的外边距为0 */
}

.group-list {
    position: relative;
    /* 设置小组列表的定位方式为相对定位 */
    width: 340px;
    /* 设置小组列表的宽度为300px */
    height: 300px;
    /* 设置小组列表的高度为300px */
    color: #000;
    /* 设置字体颜色为黑色 */
    /* border: 1px solid #000; */
    /* 为小组列表添加1px的黑色实线边框 */
    border-radius: 10px;
    /* 设置边框的圆角半径为10px */
    overflow: auto;
    /* 如果内容超出小组列表的大小，则显示滚动条 */
    max-height: 300px;
}

.group-item {
    width: 100px;
    /* 设置小组项的宽度为100px */
    position: relative;
    /* 设置小组项的定位方式为相对定位 */
    border: 1px solid #000;
    /* 设置小组项的边框为1px的黑色实线 */
    border-radius: 5px;
    /* 设置边框的圆角半径为5px */
    font-size: 18px;
    /* 设置小组项的字体大小为18px */
    margin-bottom: 10px;
    /* 设置小组项下方的外边距为10px */
    padding: 15px;
    /* 设置小组项的内边距为15px，这会使得文本与边框的距离变大 */
    color: #000;
    /* 设置字体颜色为黑色 */
    justify-content: center;
    /* 在水平方向上居中对齐内容 */
    align-items: center;
    /* 在竖直方向上居中对齐内容 */
}

.member-list {
    display: none;
    /* 默认不显示小组成员的列表 */
    position: relative;
    /* 设置小组成员列表的定位方式为静态定位 */
    left: 100%;
    /* 设置小组成员列表的左边距为100% */
    top: 0;
    /* 设置小组成员列表的上边距为0 */
    width: 150px;
    /* 设置小组成员列表的宽度为150px */
    height: 150px;
    /* 设置小组成员列表的高度为200px */
    overflow: auto;
    /* 如果内容超出列表的大小，则显示滚动条 */
    border: 1px solid #000;
    /* 设置列表的边框为1px的黑色实线 */
    background-color: #fff;
    /* 设置列表的背景颜色为白色 */
    margin-left: 0;
    /* 设置列表的左边距为0 */
}

.group-item:hover .member-list {
    display: block;
    /* 当鼠标悬停在小组项上时，显示小组成员的列表 */
}

.status-content {
    text-align: center;
    /* 设置文本居中显示 */
    white-space: pre-wrap;
    /* 设置文本自动换行 */
    line-height: 3;
    /* 设置行间距为1.5，这会使得文本换行后与上一行的距离变大 */
    font-weight: normal;
    /* 设置字体为粗体 */
    font-size: 1.5ch;

}

.group-name {
    color: #000;
    /* 设置字体颜色为黑色 */
}

.Menu {
    width: 100%;
    margin-top: 20%;
}
</style>
