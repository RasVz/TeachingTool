import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

export const allRoutes = [
    {
        path: '/',
        name: '/',
        redirect: '/PersonalView',
        component: () => import('@/layout/index.vue'),
        meta: {
        },
        children: [
            {
                path: 'PersonalView',
                name: 'PersonalView',
                component: () => import('@/views/PersonalView/index.vue'),
                meta: {
                    title: "   首页 ",
                    icon: "dashboard",
                    roles: [1, 2, 3, 4],
                    hidden: false,
                    key: "PersonalView"
                },
            },
            {
                path: 'PersonalInformation',
                name: '个人中心',
                component: () => import('@/views/PersonalCenter/index.vue'),
                meta: {
                    title: "个人中心",
                    roles: [1, 2, 3, 4],
                    key: '个人中心',
                    hidden: true
                },
            },
            {
                path: 'TaskListView',
                name: 'TaskListView',
                component: () => import('@/views/TaskList/index.vue'),
                meta: {
                    title: "我的任务",
                    icon: "task",
                    roles: [1, 2, 3, 4],
                    key: "TaskListView"
                },
            },
            {
                path: 'CourseListView',
                name: 'CourseListView',
                component: () => import('@/views/CoursesList/index.vue'),
                meta: {
                    title: "我的课程",
                    icon: "project",
                    roles: [1, 2, 3, 4],
                    hidden: false,
                    key: 'CourseListView'
                },
            },
            {
                path: 'ProjectListView',
                name: 'ProjectListView',
                component: () => import('@/views/ProjectList/index.vue'),
                meta: {
                    title: "所有项目",
                    icon: "project",
                    roles: [1, 2, 3, 4],
                    hidden: false,
                    key: 'ProjectListView'
                },
            },

            {
                path: 'GroupListView',
                name: 'GroupListView',
                component: () => import('@/views/GroupList/index.vue'),
                meta: {
                    title: "所有小组",
                    icon: "group",
                    roles: [1, 2, 3, 4],
                    key: 'GroupListView'

                },
            },
            {
                path: 'ProjectClassView',
                name: 'ProjectClassView',
                component: () => import('@/views/ProjectClassList/index.vue'),
                meta: {
                    title: "所有班级",
                    icon: "menuGroup",
                    roles: [1, 2, 3, 4],
                    hidden: false,
                    key: 'ProjectClassView'

                },
            },
            {
                path: 'projectSchedule',
                name: 'projectSchedule',
                component: () => import('@/views/projectSchedule/index.vue'),
                meta: {
                    title: "项目进度",
                    icon: "form",
                    roles: [1, 2, 3, 4],
                    hidden: false,
                    key: 'projectSchedule'
                },
            },
        ]
    },
    {
        path: '/ProjectDetail/:id',
        name: 'ProjectDetail',
        redirect: '/ProjectDetail/ProjectDetailsView',
        component: () => import('@/views/ProjectDetails/index.vue'),
        meta: {
            title: "项目详情",
            icon: "group",
            roles: [1, 2, 3, 4],
            hidden: true,
        },
        children: [
            {
                path: 'ProjectDetailsView',
                name: 'ProjectDetailsView',
                component: () => import('@/views/ProjectDetails/ProjectDetailsHome/index.vue'),
                meta: {
                    title: "项目首页",
                    roles: [1, 2, 3, 4],
                    hidden: false,
                },
            },
            {
                path: 'TaskDetail',
                name: '项目详情-任务详情',
                component: () => import('@/views/ProjectDetails/ProjectTaskManagement/index.vue'),
                meta: {
                    title: "任务详情",
                    roles: [1, 2, 3, 4],
                    hidden: false,
                },
            },
            {
                path: 'ProjectOutcomes',
                name: '项目详情-项目成果',
                component: () => import('@/views/ProjectDetails/projectResults/index.vue'),
                meta: {
                    title: "项目成果",
                    roles: [1, 2, 3, 4],

                    hidden: false
                },
            },
        ]
    },
    {
        path: '/CourseDetail/:courseId',
        name: '课程详情',
        component: () => import('@/views/CourseDetails/index.vue'),
        redirect: '课程详情-课程首页-课程动态',
        meta: {
            title: "课程详情",
            icon: "group",
            roles: [1, 2, 3, 4],
            hidden: false,
            breadcrumb: false
        },
        children: [
            {
                path: 'CourseDetailsHomePage',
                name: '课程详情-课程首页',
                redirect: '课程详情-课程首页-课程动态',
                meta: {
                    title: "课程首页",
                    roles: [1, 2, 3, 4],
                    key: '课程详情-课程首页',
                    hidden: false,
                },
                children: [
                    {
                        path: 'CourseDetailsHomePage',
                        name: '课程详情-课程首页-课程动态',
                        component: () => import('@/views/CourseDetails/CourseHomePage/index.vue'),
                        meta: {
                            title: "课程动态",
                            roles: [1, 2, 3, 4],
                            key: '课程详情-课程首页',
                            hidden: true,
                        },
                    },
                    {
                        path: 'ProjectDetails/:projectId',
                        name: '课程详情-课程首页-项目详情',
                        component: () => import('@/views/CourseDetails/CourseHomePage/ProjectDetails/index.vue'),
                        meta: {
                            title: "项目详情",
                            roles: [1, 2, 3, 4],
                            key: '课程详情-课程首页',
                            hidden: true,
                        }
                    },

                ]
            },
            {
                path: 'CourseTaskDetail',
                name: '课程详情-任务管理',
                redirect: '课程详情-任务管理-任务设置',
                meta: {
                    title: "任务管理",
                    roles: [1, 2, 3, 4],
                    hidden: false,
                    key: '课程详情-任务管理'
                },
                children: [
                    {
                        path: 'CourseTaskHome',
                        name: '课程详情-任务管理-任务设置',
                        component: () => import('@/views/CourseDetails/CourseTask/index.vue'),
                        meta: {
                            title: "任务设置",
                            roles: [1, 2, 3, 4],
                            key: '课程详情-任务管理',
                            hidden: true
                        }
                    },
                    {
                        path: 'PublishTask',
                        name: '课程详情-任务管理-发布任务',
                        component: () => import('@/views/CourseDetails/CourseTask/PublishTask/index.vue'),
                        meta: {
                            title: "发布任务",
                            roles: [1, 2, 3, 4],
                            key: '课程详情-任务管理',
                            hidden: true
                        }
                    },
                    {
                        path: 'CourseTaskDetail/:taskId',
                        name: '课程详情-任务管理-任务详情',
                        component: () => import('@/views/CourseDetails/CourseAchievementScoring/AchievementScoring/index.vue'),
                        meta: {
                            title: "任务详情",
                            roles: [1, 2, 3, 4],
                            key: '课程详情-任务管理',
                            hidden: false
                        }
                    },
                    {
                        path: 'AchievementScoring/:taskId',
                        name: '课程详情-任务管理-成果打分',
                        component: () => import('@/views/CourseDetails/CourseAchievementScoring/index.vue'),
                        meta: {
                            title: "成果打分",
                            roles: [1, 2, 3, 4],
                            key: '课程详情-任务管理',
                            hidden: false
                        },
                    },
                ]
            },
            {
                path: 'ProjectOutcomes',
                name: '课程详情-任务成果',
                component: () => import('@/views/CourseDetails/TaskResults/index.vue'),
                meta: {
                    title: "任务成果",
                    roles: [1, 2, 3, 4],
                    key: '课程详情-任务成果',
                    hidden: false
                },
            },
            {
                path: 'CourseTeamManagement',
                name: '课程详情-人员管理',
                component: () => import('@/views/CourseDetails/MemberManagement/index.vue'),
                meta: {
                    title: "人员管理",
                    roles: [1, 2, 3, 4],
                    key: '课程详情-人员管理',
                    hidden: false
                },
            },
            {
                path: 'ProjectOutcomesMan',
                name: '课程详情-成绩管理',
                component: () => import('@/views/CourseDetails/CourseGrades/index.vue'),
                meta: {
                    title: "成绩管理",
                    roles: [1, 2, 3, 4],
                    key: '课程详情-成绩管理',
                    hidden: false
                },
            },
        ]
    },
    {
        path: '/ProjectClassDetail',
        name: 'ProjectClassDetail',
        redirect: '/ProjectClassDetail/ProjectClassHome',
        component: () => import('@/views/ProjectClassDetails/index.vue'),
        meta: {
            title: '项目班详情',
            hidden: true // 设置为 true，表示不在侧边栏展示
        },
        children: [
            {
                path: 'ProjectClassHome',
                name: 'ProjectClassHome',
                component: () => import('@/views/ProjectClassDetails/ProjectClassHome/index.vue'),
                meta: {
                    title: "项目班首页",
                    hidden: false,
                },
            },
            {
                path: 'ProjectClassTaskDetails',
                name: 'ProjectClassTaskDetails',
                component: () => import('@/views/ProjectClassDetails/ProjectClassTaskManager/ProjectClassTaskDetails.vue'),
                meta: {
                    title: "任务详情",
                    hidden: false
                },
            },
            {
                path: 'ProjectClassOutcomes',
                name: 'ProjectClassOutcomes',
                component: () => import('@/views/ProjectClassDetails/ProjectClassResults/index.vue'),
                meta: {
                    title: "项目班成果",
                    hidden: false
                },
            },
            {
                path: 'ProjectClassGroupManagement',
                name: 'ProjectClassGroupManagement',
                // component: () => import('@/views/projectSchedule.vue'),
                meta: {
                    title: "小组管理",
                    hidden: false
                },
            },
            {
                path: 'ProjectClassAchievementScoring',
                name: 'ProjectClassAchievementScoring',
                component: () => import('@/views/ProjectClassDetails/ProjectClassAchievementScoring/index.vue'),
                meta: {
                    title: "成果打分",
                    hidden: false
                },
            },
            {
                path: 'ProjectClassGradesManagement',
                name: 'ProjectClassGradesManagement',
                component: () => import('@/views/ProjectClassDetails/ProjectClassAchievementScoring/index.vue'),
                meta: {
                    title: "成绩管理",
                    hidden: false
                },
            }
        ]

    },
    {
        path: '/GroupDetail/',
        name: 'GroupDetail',
        redirect: '/GroupDetail/GroupHome',
        component: () => import('@/views/GroupDetails/index.vue'),
        meta: {
            title: '小组详情',
            hidden: true // 设置为 true，表示不在侧边栏展示
        },
        children: [
            {
                path: 'GroupHome',
                name: 'GroupHome',
                component: () => import('@/views/GroupDetails/GroupDetailsHome/index.vue'),
                meta: {
                    title: "小组首页",
                    hidden: false,
                },
            },
            {
                path: 'MyTasks',
                name: 'MyTasks',
                component: () => import('@/views/GroupDetails/GroupTaskManagement/index.vue'),
                meta: {
                    title: "我的任务",
                    hidden: false
                }
            },
            {
                path: 'groupOutcomes',
                name: 'groupOutcomes',
                component: () => import('@/views/GroupDetails/GroupResults/index.vue'),
                meta: {
                    title: "小组成果",
                    hidden: false
                },
            },
            {
                path: 'groupTaskDetails',
                name: 'groupTaskDetails',
                component: () => import('@/views/GroupDetails/GroupTaskManagement/TaskDetail/index.vue'),
                meta: {
                    title: "任务详情",
                    hidden: true
                },
            },
        ]
    }

]



const { roles } = await store.dispatch('user/getInfo')
const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

const router = createRouter({
    history: createWebHashHistory(),
    routes: accessRoutes

})

export default router
