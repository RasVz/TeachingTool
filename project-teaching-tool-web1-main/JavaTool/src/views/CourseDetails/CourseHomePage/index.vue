<template>
  <div class="div-row">


    <div class="div-row1">
      <PersonalViewCarousel :items="items"/>
    </div>

    <div class="div-row2">
      <div style="width: 70%;">
        <CourseHomePageDetails />
      </div>

      <div class="Card">
        <a-card style="height: 100%; font-size: larger;overflow-y: auto">
          <div>
            <div>
              <ul style="list-style-type: none;padding: 0;">
                <li>课程名称:
                  <p>{{ CourseDetails.name }}</p>
                </li>
                <li>课程项目:
                  <p>{{ CourseDetails.projectName }}</p>
                </li>
                <li>课程信息1:
                  <p>{{ CourseDetails.message1 }}</p>
                </li>
                <li>课程信息2:
                  <p>{{ CourseDetails.message2 }}</p>
                </li>
                <li>课程信息3:
                  <p>{{ CourseDetails.message3 }}</p>
                </li>
              </ul>
            </div>
            <div></div>
          </div>
        </a-card>
      </div>
    </div>
  </div>

</template>


<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import PersonalViewCarousel from './PersonalViewCarousel.vue';
import CourseHomePageDetails from './CourseHomePageDetails.vue';
import CourseDao from '@/daos/course_dao';
import TeachingClassDao from '@/daos/teachingClass_dao';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
const courseDao = new CourseDao();
const teachingClassDao = new TeachingClassDao();
const cards = ref([
  {
    id: 1,
    name: '项目式教学管理工具'
  },
  {
    id: 2,
    name: 'b '
  }
]);
const route = useRoute();
const store = useStore();

store.commit('course/SET_COURSEID', route.params.courseId)

const items = ref([
    {
        project_id: 1,
        project_name: '数据库设计1',
        class_name: '项目式教学管理工具1',
        task_completed: 10,
        tasks_unfinished: 10,
        completed_percentage: 50
    },
    {
        project_id: 2,
        project_name: '数据库设计2',
        class_name: '项目式教学管理工具2',
        task_completed: 10,
        tasks_unfinished: 10,
        completed_percentage: 50
    },
    {
        project_id: 3,
        project_name: '数据库设计3',
        class_name: '项目式教学管理工具3',
        task_completed: 10,
        tasks_unfinished: 10,
        completed_percentage: 50
    },
    {
        project_id: 4,
        project_name: '数据库设计4',
        class_name: '项目式教学管理工具4',
        task_completed: 10,
        tasks_unfinished: 10,
        completed_percentage: 50
    },
    {
        project_id: 5,
        project_name: '数据库设计5',
        class_name: '项目式教学管理工具5',
        task_completed: 10,
        tasks_unfinished: 10,
        completed_percentage: 50
    }, {
        project_id: 6,
        project_name: '数据库设计5',
        class_name: '项目式教学管理工具6',
        task_completed: 10,
        tasks_unfinished: 10,
        completed_percentage: 50
    }, {
        project_id: 7,
        project_name: '数据库设计5',
        class_name: '项目式教学管理工具7',
        task_completed: 10,
        tasks_unfinished: 10,
        completed_percentage: 50
    }, {
        project_id:8,
        project_name: '数据库设计5',
        class_name: '项目式教学管理工具8',
        task_completed: 10,
        tasks_unfinished: 10,
        completed_percentage: 50
    },

   

]);

onMounted(() => {
  //存储课程拥有的班级信息与项目信息
  const init = async (courseId: number) => {
    let result = await teachingClassDao.findClassByCourseId(courseId)


    store.commit('course/SET_TEACHINGCLASS', result.data.data)
    console.log(store.getters.teachingClasss);

  };
  init(store.getters.courseId)
})


const newcard = computed(() => {
  let card = [...cards.value];

  while (card.length < 4) {
    card.push({ id: 1, name: '还未有项目' });
  }
  return card.slice(0, 4);
});

interface Card {
  id: number;
  name: string;
  projectName: string;
  message1: string;
  message2: string;
  message3: string;
}

const CourseDetails = ref<Card>({
  id: 0,
  name: '某课程',
  projectName: '某项目',
  message1: '信息1',
  message2: '信息2',
  message3: '信息3'

});
</script>

<style scoped>
p {
  margin: 3%;
  text-align: center;
}

.div-row {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  padding: 1%;
  background-color: rgb(242, 247, 250);

}

.div-row1 {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 30%;
}

.div-row2 {
  border-radius: 10px;
  display: flex;
  height: 70%;
  margin: 1% 0   0 0 ;
}

.Card {
  width: 30%;
  margin: 0 1.5%;
}
</style>