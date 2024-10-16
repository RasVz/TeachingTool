<template>

    <div class="carousel">
        <a-button @click="prevSlide" v-if=" props.items.length>4" class="checkout"><</a-button>

            <div class="carousel-container">

                <div  :style="wrapperStyle">
                    <div  v-for="(item, index) in props.items" :key="index" class="carousel-item" @click="toProjectDetail(item.project_id)">
                       <div style=" display: flex;
                                            flex-direction: column;
                                            align-items: center;">
                            <a-progress type="circle" :percent="item.completed_percentage" :size="100" />
                            <div style="width: 100% ;text-align: center;">
                                <p>{{ item.class_name }}</p>
                                <hr>
                            </div>
                             
                            
                     
                     
                        <div style="display: flex;width: 100%; flex-wrap: wrap; justify-content: space-around;">
                            <span style="text-align: center; font-size: larger;">已完成：{{ item.task_completed
                                }}</span>
                            <span style="text-align: center; font-size: larger;">未完成任务：{{ item.tasks_unfinished
                                }}</span>
                        </div>
                    </div>
                    </div>
                </div>

            </div>

            
            <a-button @click="nextSlide" class="checkout" v-if=" props.items.length>4">></a-button>
        </div>
</template>

<script lang="ts" setup>
import { ref, computed,onMounted  } from 'vue';
import { useRouter } from 'vue-router';
interface project {
    project_id: number,
    project_name: String,
    class_name: String,
    task_completed: number,
    tasks_unfinished: number,
    completed_percentage: number
}
const props = defineProps({
  items: {
    type: Object as ()=>project[],
    default: undefined
  }
})





const myDiv = ref(null);  
const currentIndex = ref(0);

var visibleItemsCount = 4;

const wrapperStyle = computed(() => ({
    display:'flex',
    width: '100%',
    height:'100%',
    transform: `translateX(-${currentIndex.value *25*visibleItemsCount}%)`,
    transition: 'transform 1s ease',

}));

const nextSlide = () => {
 
    if (currentIndex.value < (props.items.length-visibleItemsCount)/visibleItemsCount) {
        currentIndex.value++; 
    }
    else {
        currentIndex.value = 0;
    }
};

const prevSlide = () => {
    if (currentIndex.value > 0) {  
        currentIndex.value --;
    }
    else {
        currentIndex.value = Math.ceil((props.items.length-visibleItemsCount)/visibleItemsCount)

    }
};

const percent = ref();

//路由跳转
const router = useRouter()
const toProjectDetail = (toProjectDetail:number) => {
    console.log(toProjectDetail);
    
    router.push({ name: '课程详情-课程首页-项目详情', params: { projectId: toProjectDetail } })
}
</script>

<style scoped>
.carousel {
    display: flex;
     width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.carousel-container {
    width: 94%;
    height: 100%;
  overflow: hidden;
    display: flex;
}



.carousel-item :hover {
    cursor: pointer;
}

.carousel-item {
  min-width: 20%;
 
  height: 100%;
    margin: 0 2.5%;
    background-color: rgb(255, 255, 255);
    border-radius: 7%;
}

.checkout {
    width: 3%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 30px;
    border-radius: 5%;
}

.carousel-item-text {
    float: right;
    margin: 0 5% 0;
}

p {
    margin-top: 3vh;
}
</style>