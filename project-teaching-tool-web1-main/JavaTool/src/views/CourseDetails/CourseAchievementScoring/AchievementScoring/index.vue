<template>

    <div class="all">
        <div style="display: flex ;width: 100%;">
            <div style="margin-right: 1%;">
                <a-button @click="back()">
                    < 返回 </a-button>
            </div>
            <div class="header">
                <a-button class="buttonFront" @click="goFront()">上一个</a-button>
                <div>
                    <ul
                        style="list-style-type: none; line-height: 100%; margin-bottom: 0; text-align: center; padding: 0;">
                        <li>一小组</li>
                        <li>前端设计</li>
                        <li>提交时间:2024-8-31</li>
                    </ul>
                </div>
                <a-button class="buttonNext" @click="goNext()">下一个</a-button>
            </div>
            <div style="width: 5%;">

            </div>
        </div>

        <div style="display: flex; width: 90%;">
            <div class="Deliverables">
                <div class="DeliverablesTabeleTitle">
                    交付物
                </div>
                <div class="DeliverablesTabele">
                    <template v-for="(item, index) in Deliverables" :key="index">
                        <ol
                            style="list-style-type: none; line-height: 50px; margin-bottom: 0;padding: 0;font-size: 14px;">
                            <li style="background-color: #e3f1ff;">
                                <span style="margin-left: 2%;">
                                    {{ index + 1 + '、' + item.Deliverablesname }}
                                </span>
                            </li>
                            <li>
                                <span style="margin-left: 2%;">
                                    成果名称：
                                    <a>
                                        {{ item.Achievementname }}
                                    </a>
                                </span>
                            </li>
                        </ol>
                    </template>
                </div>
            </div>
            <div class="Scoring ">
                <div class="Score">
                    <span style="white-space: nowrap;">
                        小组得分：
                    </span>
                    <div style="display: inline-block;" v-if="visable">
                        <a style="font-size: 16px; " @click="checkout">修改</a><span
                            style="color: red;font-size: 30px">100
                        </span>
                        分
                    </div>
                    <div v-else style="display: inline-block;">
                        <a-input-number v-model:value="formState.score" :min="0" :max="100" :step="1"
                            style="width: 40%;" :size="'small'" /><a-button style="margin-left: 1%;" @click="checkout">
                            保存
                        </a-button>
                    </div>
                </div>
                <div class="Comments">
                    <span style="white-space: nowrap;">
                        评语：
                    </span>
                    <div class="Comments-textarea">
                        <a-textarea v-model:value="formState.value" :placeholder="'在此输入评价'" :rows="3"
                            style="width: 70%;" />
                        <a-button style="margin-left: 1%;">
                            保存
                        </a-button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="studentTable">
        <AchievementstudentTable />
    </div>



</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import AchievementstudentTable from './AchievementstudentTable.vue';
import { useRoute, useRouter } from 'vue-router';


interface FormState {
    score: number;
    value: string
}
const formState = ref<FormState>({
    score: 0,
    value: ''
});
const visable = ref<Boolean>(true);
const checkout = () => {
    visable.value = !visable.value
}
const Deliverables = reactive([
    {
        Deliverablesname: '前端设计报告',
        Achievementname: '前端设计报告-第一小组'
    }, {
        Deliverablesname: '后端开发报告',
        Achievementname: '后端开发报告-第二小组'
    }, {
        Deliverablesname: '后端开发报告',
        Achievementname: '后端开发报告-第二小组'
    }
    , {
        Deliverablesname: '后端开发报告',
        Achievementname: '后端开发报告-第二小组'
    }
    , {
        Deliverablesname: '后端开发报告',
        Achievementname: '后端开发报告-第二小组'
    }

])


const currentIndex = ref(0);
const router = useRouter();
const route = useRoute();
//获取 传过来的对象数组
// 处理 dataArray，确保它是 string 类型
const dataArrayQuery = route.query.dataArray;
const dataArrayString = Array.isArray(dataArrayQuery) ? dataArrayQuery[0] : dataArrayQuery;

// 解析 JSON 字符串为对象数组
const dataArray = dataArrayString ? JSON.parse(dataArrayString) : [];
const dataArrayLength = dataArray.length;

const back = () => {
    router.push({
        name: '课程详情-任务管理-成果打分',
    })
}
const goFront = () => {
    if (currentIndex.value == 0) {
        console.log('当前是第一个小组，没有上一个');
    } else {
        currentIndex.value -= 1;
        //调用方法
        console.log(currentIndex.value);

    }
}
const goNext = () => {
    if (currentIndex.value == dataArrayLength) {
        console.log('当前是最后一个小组，没有下一个');
    } else {
        currentIndex.value += 1;
        //调用方法
        console.log(currentIndex.value);
    }
}


</script>
<style scoped>
.container {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}

.all {

    display: flex;
    justify-content: space-between;
    padding: 1.5%;
    margin: 1%;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;
    /* 垂直居中 */
    background-color: #fff;

    overflow-y: auto;
}

.studentTable {

    height: 50%;
    justify-content: space-between;
    margin: 1%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    border: 1px solid lightgray;

    overflow-y: auto;
    background-color: #fff;
}

.header {
    width: 92%;
    background-color: #cce5ff;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.buttonFront {
    margin-right: 6%;
    align-items: flex-end;
}

.buttonNext {
    margin-left: 6%;
}

.Deliverables {
    margin-left: 1%;
    margin-top: 1%;
    flex: 1;
    height: auto;
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
    /* 增加2px的字母间距 */

}

.DeliverablesTabele {
    flex: 20;
    max-height: 200PX;
    overflow-y: auto;
}

.Scoring {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    flex: 1;
    margin-left: 4%;
    font-size: 14px;
    margin-top: 2%;
    width: 87%;
}

.Comments {
    margin-top: 2%;
    width: 80%;
    display: flex;

}

.Comments-textarea {
    width: 90%;
}
</style>
