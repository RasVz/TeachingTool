import ToolRequest from '@/base/newToolAxios'
import RequestOption from '@/base/RequestOption'
import { getActToolUrl } from '@/base/constant'
import { stubObject } from 'lodash'
import { pascalCase } from 'unplugin-vue-components'
const tr = new ToolRequest()

export default class CourseDao {
    /**
     * 根据教师ID寻找课程
     * @returns
     */
    async findCoursesByTeacherId(currentPage: any, pageSize: any, teacherId: number) {
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action: 'findCoursesByTeacherId',
            teacherId: teacherId,
            currentPage: currentPage,
            pageSize: pageSize
        }, ro)
    }

    /**
     *  新增课程
     *  @returns
     */
    async createCourse(formState: any) {
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action: 'createCourse',
            // 为了实现初步创建课程的功能，只发送了必要的参数，可以根据需要添加或者修改参数
            course_name: formState.course_name,
            create_time: new Date(),
            creator_id: 114514,
            course_status: 2,
            subject_id: 888888,
            coures_type: 1,
            project_driven_teaching: 1
        }, ro)
    }

    /**
     * 获取班级和项目
     * @returns
     */
    async findClassAndProjectByCourseIdAndTeacherId(teacherId: number,courseId:number) {
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action: 'findClassAndProjectByCourseIdAndTeacherId',
            teacherId: teacherId,
            courseId:courseId,
        }, ro)
    }
}
