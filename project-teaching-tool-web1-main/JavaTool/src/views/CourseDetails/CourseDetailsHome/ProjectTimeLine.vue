<template>
    <div>
        <CheckoutTimeLine />
    </div>
    <div class="scroll">
        <a-button class="buttons" @click="scrollLeft"><template #icon>
                <LeftOutlined />
            </template></a-button>
        <div class="timeline-container">

            <div class="timeline" ref="scrollContainer">
                <!-- Time Line -->
                <div class="line" :style="{ width: (events.length * 150) + 'px' }">
                </div>
                <!-- Time Points -->
                <div v-for="(event, index) in props.events" :key="index" class="timeline-item"
                    :class="{ top: index % 2 === 0, bottom: index % 2 !== 0 }" :style="{ left: (index * 150) + 'px' }">
                    <ul v-if="index % 2 === 0">
                        <li class="date">{{ event.date }}</li>

                        <li>
                            <span class="timeline-description">
                                <a type="primary" @click="visible2 = true">{{ event.description }}</a>
                            </span>
                        </li>

                        <li class="holder" @click="viewGroupDetail()">
                            {{ event.holder }}
                        </li>
                        <li class="radius-top"></li>
                    </ul>
                    <ul v-if="index % 2 !== 0">
                        <li class="radius-bottom"></li>
                        <li class="holder" @click="viewGroupDetail">{{ event.holder }}</li>
                        <li>
                            <span class="timeline-description">
                                <a @click="visible2 = true">{{ event.description }}</a>
                            </span>
                        </li>
                        <li class="date">{{ event.date }}</li>
                    </ul>
                </div>
            </div>

        </div>
        <TaskDetails :modelVisible="visible2" @update:modelVisible="(val) => { visible2 = val }" />

        <a-button class="buttons" @click="scrollRight">
            <template #icon><right-outlined /></template></a-button>
    </div>
</template>
<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { RightOutlined, LeftOutlined } from '@ant-design/icons-vue';
import CheckoutTimeLine from './CheckoutTimeLine.vue';

const props = defineProps({
    events: {  
    type: Array as () => Array<{  
      date: String,  
      description: String,  
      holder: String  
    }>,  
    required: true  
  }  
});

const visible2 = ref(false);
const scrollContainer = ref(null);
const router = useRouter();

const viewGroupDetail = () => {
    // 点击小组文本时触发，跳转到小组详情页，并传递参数
    router.push({ name: 'GroupDetail' });
};

const toClick = (index) => {
    console.log(index);
};

const scrollLeft = () => {
    if (scrollContainer.value.scrollLeft > 0) {
        scrollContainer.value.scrollLeft -= 400; // 每次左移400px  
    }
};

const scrollRight = () => {
    const maxScroll = scrollContainer.value.scrollWidth - scrollContainer.value.offsetWidth;
    if (scrollContainer.value.scrollLeft < maxScroll - 2) {
        scrollContainer.value.scrollLeft += 400; // 每次右移400px
    } else {
        scrollContainer.value.scrollTo(0, 0); // 滚动至头部
    }
};

onMounted(() => {
    // 组件挂载后的逻辑，确保DOM已经渲染完毕
});
</script>
<style scoped>
.scroll {

    display: flex;
    justify-content: space-between;
    align-items: center;

}

.buttons {
    margin: 20px;

}

.radius-top {
    width: 18px;
    /* 设置宽度 */
    height: 18px;
    /* 设置高度，与宽度相等以形成圆形 */
    border-radius: 50%;
    /* 设置边框圆角半径为50%，形成圆形 */
    background-color: #a45be6;
    /* 设置背景颜色，以便看到圆形效果 */
    display: inline-block;
    margin-top: 0px;
    /* 将li元素设置为内联块级元素，以便它们可以在一行中显示 */
}

.radius-bottom {
    width: 18px;
    /* 设置宽度 */
    height: 18px;
    /* 设置高度，与宽度相等以形成圆形 */
    border-radius: 50%;
    /* 设置边框圆角半径为50%，形成圆形 */
    background-color: #a45be6;
    /* 设置背景颜色，以便看到圆形效果 */
    display: inline-block;
    margin-bottom: -9px;
    /* 将li元素设置为内联块级元素，以便它们可以在一行中显示 */
}

.timeline-container {

    padding: 5px;
    height: 100%;
    width: 100%;
}

.timeline::-webkit-scrollbar {
    display: none;
}

.timeline {

    overflow-x: auto;
    /* 保留滚动条属性，但我们将通过按钮控制滚动（如果需要的话） */
    white-space: nowrap;
    /* 确保内容在同一行显示，触发水平滚动 */
    scroll-behavior: smooth;
    /* 平滑滚动 */
    position: relative;
    /* 关键：使.timeline成为.line的已定位祖先元素 */
    height: 200px;
    /* top: 5%; */
    padding: 10px;

}

.line {
    position: absolute;
    /* 相对于最近的已定位祖先元素（这里是.timeline）定位 */
    top: 50%;

    left: 0;
    /* 从左边开始 */
    right: 0;
    /* 延伸到右边，确保覆盖整个.timeline的宽度 */
    height: 2px;
    transform: translateY(-50%);
    /* 垂直居中 */
    border: 2px dashed #ccc;
    /* 虚线样式 */
    pointer-events: none;
    /* 可选：防止虚线影响滚动或点击事件 */
}

.timeline-item {
    position: absolute;
    max-width: 200px;


}

.timeline-item.top {
    top: 0;
}

.timeline-item.bottom {
    bottom: 0px;
}

.timeline-description {
    display: inline-block;
    background: #a45be6;
    color: white;
    border-radius: 4px;
    padding: 3px 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    cursor: pointer;
}

.timeline-description:hover {
    transform: scale(1.03);
    /* 放大10% */
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.15);
    /* 添加阴影效果 */
}

.holder {
    margin-left: 20px;
}

.holder:hover {
    margin-left: 20px;
    color: #2851e6;
    /* 鼠标悬停时改变背景色 */
    cursor: pointer;
    /* 改变鼠标样式为手指形状，进一步提示可点击 */
}

.timeline-item::before {
    content: "";
    position: absolute;
    transform: translateX(-50%);
    width: 2px;
    background: #ccc;
}

.timeline-item.top::before {
    bottom: 29px;
    height: 32px;
    margin-left: 9px;
}

.timeline-item.bottom::before {
    top: 25px;
    height: 29px;
    margin-left: 9px;

}

ul {
    margin: 0;
    padding: 0;
}

ul li {
    list-style: none;
    margin: 5px 0;
}

a {
    color: white;

}
</style>