import ToolRequest from '@/base/newToolAxios'
import RequestOption from '@/base/RequestOption'
import { getActToolUrl } from '@/base/constant'
const tr = new ToolRequest()

export default class TeamDao {


    /**
     * 根据班级ID列表寻找小组列表
     * @returns
     */
    async findTeamByClassIds(classIds) {
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action: 'findTeamByClassIds',
            classIds: classIds,
      
        }, ro)
    }




}
