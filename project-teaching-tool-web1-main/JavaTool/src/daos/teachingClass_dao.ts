import ToolRequest from '@/base/newToolAxios'
import RequestOption from '@/base/RequestOption'
import { getActToolUrl } from '@/base/constant'
const tr = new ToolRequest()

export default class TeachingClassDao {


    /**
     * 根据课程ID列表寻找班级列表
     * @returns
     */
    async findClassByCourseId (courseId:number) {
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action: 'findClassByCourseId',
            courseId: courseId,
      
        }, ro)
    }




}
