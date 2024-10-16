<template>
    <!-- <div ref="inputRef" v-resize="getStyle" style=" width: 100%;height: 100%;">
        <div style="padding:5px; width: 100%;height: 100%;display: flex; justify-content: space-around;"
            v-show="change">
            <div style="display: flex; flex-direction:column; justify-content: space-around;">
                <div>
                    <h2>{{ props.project.name }}</h2>
                    <h3>先放点东西</h3>
                </div>
                <h4>2024/8/14 15:20:22</h4>
            </div>
            <div style="margin: 5% 0 0 5% "> -->
                <!-- <svg-icon style="width: 50px;height: 50px;border: 1px white solid;border-radius: 10px; " name="personal" /> -->
            <!-- </div>
        </div>

        <div style="padding:5px;width: 100%;height: 100%;  display: flex; justify-content: center; align-items: center; "
            v-show="!change">

            <h2>我的项目1</h2>
        </div>
    </div> -->

    <a-card hoverable style="width: 300px">
    <template #cover>
      <img  alt="example" src="../../assets/image.png"/>
    </template>
    <template #actions>
      <setting-outlined key="setting" />
      <edit-outlined key="edit" />
      <ellipsis-outlined key="ellipsis" />
    </template>
    <a-card-meta :title="props.project.name" description="32学时">
    </a-card-meta>
    <span>李四</span>
  </a-card>

</template>

<script lang="ts" setup>

import { ref, onMounted, } from 'vue';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';


const props = defineProps({
    project: {
        type: Object,
        required: true, // 如果这个 prop 是必需的，可以添加 required: true  
        default: () => ({ // 提供一个默认值对象，注意使用函数来返回对象，以避免所有实例共享同一个对象  
            id: null, // 假设 id 是一个数字  
            name: '暂无项目', // 假设 name 是一个字符串  
            // 可以继续添加其他属性  
        }),
    }
})

interface divStyle {
    width: number;
    height: number;
}
const change = ref<boolean>(true);
const inputRef = ref();

const getStyle = (e: divStyle) => {
    if (e.height < 100) {
        change.value = false
    } else {
        change.value = true
    }
};

</script>