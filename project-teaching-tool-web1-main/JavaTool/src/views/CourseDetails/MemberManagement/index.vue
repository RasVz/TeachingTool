<template>
  <div style="height: 97%;">
    <div class="head">
      <div @mousedown="e => {
        e.preventDefault()
        
      }">
        <a-select v-model:value="selectedClass"  placeholder="请选择班级" style="width: 300px; " @select="handleSelect " 
        option-label-prop="label">
          <a-select-option :label="myClass.class_name" v-for="myClass in classOptions" :key="myClass.class_id">
            <div style="display: flex; justify-content: space-between; ">
              {{ myClass.class_name }}
              <a-button type="dashed" @click.stop="showDeleteClassConfirm(myClass)" v-if="myClass.class_id !== null"
                class="confirmButton"><svg-icon :name="'delete'" /></a-button>
            </div>
          </a-select-option>
          <template #dropdownRender="{ menuNode: menu }">

            <v-nodes :vnodes="menu" />
            <a-divider style="margin: 4px 0" />
            <a-space style="padding: 4px 8px">
              <a-input ref="inputRef" v-model:value="class_name1" placeholder="输入班级名称" />
              <a-button type="text" @click="addItem(class_name1)">
                <template #icon>
                  <plus-outlined />
                </template>
                添加班级
              </a-button>

            </a-space>

          </template>
        </a-select>
      </div>


      <div style="margin-right: 25px;float: right;">
        <a-button type="primary" style="margin-right: 5px" @click="showAddStudent">添加学生</a-button>
        <a-button type="primary" style="margin-right: 5px" @click="showImportStudent">导入学生</a-button>
        <a-button type="primary" danger style="margin-right: 5px" @click="showDeleteStudent">批量删除</a-button>
        <a-button type="primary" style="margin-right: 5px" @click="showMoveStudent">批量调动</a-button>
        <a-button type="primary">批量导出学生</a-button>
      </div>



    </div>
    <div class="body">
      <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
        <a-layout >
          <a-layout-sider width="300" style="background: #fff;">
            <div style="padding: 16px; font-size: 16px; font-weight: bold;">
              <span style="margin:15px">小组</span>
              <svg-icon @click="showAddTeamModal" :name="'add1'" />
              <a-button type="primary" style="margin-right: 5% ;float: right" @click="showRandomGrouping" size="small">随机分组</a-button>
              <a-modal v-model:open="visibleAddTeam" title="添加小组" @ok="handleOk" @cancel="handleCancel">
                <a-input v-model:value="newTeamName" placeholder="输入小组名称" />
              </a-modal>
              <div style="margin: 10px;">
                <a-input v-model:value="searchQuery" placeholder="搜索小组" style="border-radius: 8px;" allow-clear />
              </div>
              <div style=" overflow-y: auto; ">
                <a-menu style="height:50vh;" v-model:selectedKeys="selectedKeys" theme="light">
                  <template v-for="team in filteredTeams" :key="team.team_id">
                    <a-menu-item @click="selectTeam(team.team_id)">

                      <div style="display: flex; justify-content: space-between; ">

                        <span>
                          <svg-icon :name="'team'" />
                          {{ team.team_name }}
                        </span>

                        <div>


                          <a-button type="dashed" @click="showDeleteTeamConfirm(team)" v-if="team.team_id !== null"
                            class="confirmButton"><svg-icon :name="'delete'" /></a-button>

                        </div>

                      </div>
                    </a-menu-item>

                  </template>
                </a-menu>
              </div>
            </div>
          </a-layout-sider>

          <a-layout-content style="background-color: white;">
            <myStudentTable :teamId="selectedTeamId" @update:selectedCount="handleSelectedCountUpdate" />

          </a-layout-content>

        </a-layout>
      </a-space>
    </div>

  </div>

  <AddStudent v-model:open="visibleAddStudent" />
  <ImportStudent v-model:open="visibleImportStudent" />
  <contextHolder />
  <DeleteStudent v-model:open="visibleDeleteStudent" />
  <MoveStudent v-model:open="visibleMoveStudent" />
  <RandomGrouping v-model:open="visibleRandomGrouping" :selectedCount="selectedCount" ></RandomGrouping>
  



</template>
<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue';
import myStudentTable from './myStudentTable.vue';
import { ref, computed, defineComponent } from 'vue';
import { Modal, SelectOption } from 'ant-design-vue';
import AddStudent from './AddStudent.vue'
import ImportStudent from './ImportStudent.vue';
import DeleteStudent from './DeleteStudent.vue';
import MoveStudent from './MoveStudent.vue';
import RandomGrouping from './RandomGrouping.vue';

const [modal, contextHolder] = Modal.useModal();


//获取学生列表组件中选取的学生数量
const selectedCount = ref(0);

const handleSelectedCountUpdate = (count) => {
  selectedCount.value = count;
};




//删除小组时的气泡确认框
const showDeleteTeamConfirm = (team) => {
  modal.confirm({
    title: '确认删除' + team.team_name,

    content: '此操作会删除此小组相关的所有内容（包括上传的的成果与安排的任务）',
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    width: 800,
    getContainer: () => document.body,

    bodyStyle: {
      // height: 'auto', // 高度

    },
    onOk() {
      deleteTeam(team.team_id)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

//删除班级时的气泡确认框
const showDeleteClassConfirm = (myClass) => {
  modal.confirm({
    title: '确认删除' + myClass.class_name,

    content: '此操作会删除此班级相关的所有内容（包括班级内的所有小组及其成果与安排的任务）',
    okText: '删除',
    okType: 'danger',
    zIndex: 1050, // 直接设置 zIndex 属性
    cancelText: '取消',
    width: 800,

    bodyStyle: {
      // height: '150px', // 高度


    },
    onOk() {
      deleteClass(myClass.class_id);
    },
    onCancel() {

    },
  });
};




const selectedKeys = ref<string[]>([null]);

const searchQuery = ref('');
const teams = ref([
  {
    team_id: null,
    class_id: null,
    team_name: '全部学生',
  },

  {
    team_id: 2,
    class_id: 2,
    team_name: '二班小组2',
  },
  {
    team_id: 3,
    class_id: 2,
    team_name: '二班小组3',
  },
  {
    team_id: 4,
    class_id: 3,
    team_name: '三班小组2',
  },
  {
    team_id: 5,
    class_id: 3,
    team_name: '三班小组3',
  },

]);




//创建任务窗口状态

const visibleAddTeam = ref<boolean>(false);
const visibleAddStudent = ref<boolean>(false);
const visibleImportStudent = ref<boolean>(false);
const visibleDeleteStudent = ref<boolean>(false);
const visibleMoveStudent = ref<boolean>(false);
const visibleRandomGrouping = ref<boolean>(false);

const newTeamName = ref('');


//添加班级方法
const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});


const handleOk = () => {


  addTeam(newTeamName.value);

  visibleAddTeam.value = false;
  newTeamName.value = '';

};

const handleCancel = () => {
  visibleAddTeam.value = false;
};

const showAddTeamModal = () => {
  visibleAddTeam.value = true;
};

const showRandomGrouping = () =>{
  visibleRandomGrouping.value = true;
}

const showAddStudent = () => {
  visibleAddStudent.value = true;
};

const showImportStudent = () => {
  visibleImportStudent.value = true;
};

const showDeleteStudent = () => {
  visibleDeleteStudent.value = true;
};

const showMoveStudent = () => {
  visibleMoveStudent.value = true;
}

//班级选择框与小组列表之间的联动
const classOptions = ref([
  {
    class_id: null,
    class_name: '全部班级',
  },

  {
    class_id: 2,
    class_name: '二班',
  },
  {
    class_id: 3,
    class_name: '三班',
  },

]);

const selectedClass = ref(null);
console.log(selectedClass.value);

const handleSelect = (value:number) => {
  selectedClass.value = value;

  
  
};

const filteredTeams = computed(() => {
  return teams.value.filter(team => {
    return team.team_name.includes(searchQuery.value) && 
           (selectedClass.value === null || team.class_id === selectedClass.value);
  });
});

//小组列表与学生之间的联动
const selectedTeamId = ref<number | null>(null);

const selectTeam = (teamId) => {
  selectedTeamId.value = teamId;
  
};



//添加小组方法
const addTeam = (teamName) => {
  const newTeamId = teams.value.length + 1;
  const newClassId = selectedClass.value

  teams.value.push({ team_name: teamName, team_id: newTeamId, class_id:newClassId });



};

const inputRef = ref();
const class_name1 = ref();



//删除班级方法
const deleteClass = (classId) => {
  classOptions.value = classOptions.value.filter(myClass => myClass.class_id !== classId);
  console.log(`Deleted class with ID: ${classId}`);
};

//删除小组方法
const deleteTeam = (teamId) => {
  teams.value = teams.value.filter(g => g.team_id !== teamId);
};


//添加班级方法
const addItem = (value) => {
  if(value !==''&& undefined){
  classOptions.value.push({ class_id: class_name1.value, class_name: class_name1.value, })
  class_name1.value = '';
  setTimeout(() => {
    inputRef.value?.focus();
  }, 0);
}
}




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