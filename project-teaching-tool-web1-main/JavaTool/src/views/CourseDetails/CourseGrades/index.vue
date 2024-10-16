<template>
    <div style="height: 97%;">
        <div class="head">
            <a-select v-model:value="classValue" placeholder="请选择班级" :options="classOptions" style="width: 200px;"
                :field-names="{ label: 'class_name', value: 'class_id' }" >
            </a-select>
            <div style="margin-right: 25px;float: right;">
                <a-button type="primary" style="margin-right: 5px">导出总成绩</a-button>
            </div>
        </div>

        <div class="body">
                <a-layout style="height: 100%;">
                    <a-layout-sider width="220" style="background: #fff;">
                        <div style="padding: 16px; font-size: 16px; font-weight: bold;height: 100%;">
                            <span style="margin:15px">当前小组</span>
                            <div style="margin: 10px;">
                                <a-input v-model:value="searchQuery" placeholder="搜索小组" style="border-radius: 8px;"
                                    allow-clear />
                            </div>
                            <div style=" overflow-y: auto; ">
                                <a-menu style="height:50vh;" v-model:selectedKeys="selectedKeys" theme="light">
                                    <a-menu-item :key=0>
                                        <svg-icon :name="'team'" />
                                        <span>全部学生</span>
                                    </a-menu-item>
                                    <template v-for="team in teams" :key="team.team_id">
                                        <a-menu-item>
                                            <div style="display: flex; justify-content: space-between; ">
                                                <span @click="console.log(selectedKeys)">
                                                    <svg-icon :name="'team'" />
                                                    {{ team.team_name }}
                                                </span>
                                            </div>
                                        </a-menu-item>
                                    </template>
                                </a-menu>
                            </div>
                        </div>
                    </a-layout-sider>
                    <a-layout-content style="background-color: white; height: 100%;">
                        <StudentTable :team-id="selectedKeys[0]" />
                    </a-layout-content>
                </a-layout>
                
        </div>
    </div>

</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import StudentTable from './StudentTable.vue';


const selectedKeys = ref<number[]>([0]);

const searchQuery = ref('');
const teams = ref([])

const showElement = computed(() => {
    if (selectedKeys.value[0] == 0)
        return false
    else
        return true
})

//班级数据
const classOptions = ref([
    {
        class_id: null,
        class_name: '全部班级',
    },
    {
        class_id: 1,
        class_name: '1班',
    },
    {
        class_id: 2,
        class_name: '2班',
    },

]);

const classValue = ref(null);  
  
// 选择班级后触发  
watch(()=>{
    return classValue.value
}, newValue => {  
    if (newValue === 0) {
        teams.value = ([
            {
                team_id: 10,
                team_name: '小组1',
            },
            {
                team_id: 20,
                team_name: '小组2',
            },

        ]);
    } else if (newValue === 1) {
        teams.value = ([

            {
                team_id: 10,
                team_name: '小组1',
            },

        ]);
    } else {
        teams.value = ([
            {
                team_id: 20,
                team_name: '小组2',
            },

        ]);
    }
    selectedKeys.value = [0]
  
},{immediate:true}); 


</script>

<style scoped>
.icon-container {
    display: flex;
    justify-content: flex-end;
    /* 使内容靠右对齐 */
    align-items: center;
    /* 如果需要，可以垂直居中 */
}

.head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5%;
    margin: 1%;
    height: auto;
    /* 使容器高度为视口高度 */
    max-width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: #fff;
    overflow: auto;

}

.body {
    display: flex;
    flex-direction: column;
    padding: 0.5%;
    margin: 1%;
    height: 85%;
    /* 使容器高度为视口高度 */
    max-width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: #fff;
    overflow: auto;
}

/*删除按钮样式*/
.confirmButton {
    background-color: transparent;
    border: none;
}

:deep(#components-a-popconfirm-demo-placement) .ant-btn {
    width: 70px;
    text-align: center;
    padding: 0;
    margin-right: 8px;
    margin-bottom: 8px;
}

.custom-modal-content {
    font-size: 18px;
}
</style>