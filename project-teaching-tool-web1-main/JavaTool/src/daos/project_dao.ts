import ToolRequest from '@/base/newToolAxios'
import RequestOption from '@/base/RequestOption'
import { getActToolUrl } from '@/base/constant'
const tr = new ToolRequest()

export default class projectDao {
    /**
    * 列出所有项目
    * @returns
    */
    async listAllProject() {
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action: 'listAllProject'
        }, ro)
    }

}