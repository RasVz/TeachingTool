import ToolRequest from '@/base/newToolAxios'
import RequestOption from '@/base/RequestOption'
import { getActToolUrl } from '@/base/constant'
import course from '@/store/modules/course'
const tr = new ToolRequest()

export default class TaskDao {


    async findCoursesByTeacherId(courseId: number,) {
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action: 'findTasksByCourseId',
            courseId: courseId,
        }, ro)
    }

    /**
     * 创建任务
     * @returns
     */
    async createTask(formState: any) {
        const ro = new RequestOption()
        return await tr.post(getActToolUrl(), {
            action: 'createTask',
            taskName: formState.task_name,
            projectId: formState.project_id,
            createTime: new Date(),
            creatorId: 1,
            taskDescription: formState.task_description,
            taskType: formState.task_type,
            deliverables: JSON.stringify(formState.deliverables)
        }, ro)
    }

    /**
 * 查看课程项目完成情况
 * @returns
 */
    async findTaskStatus(courseId: any) {
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action: 'findTaskStatus',
            courseId: courseId
        }, ro)
    }
}
