import ToolRequest from '@/base/newToolAxios'
import RequestOption from '@/base/RequestOption'
import { getActToolUrl } from '@/base/constant'
const tr = new ToolRequest()

export default class UserDao {
    /**
     * 列出所有菜品
     * @returns
     */
    async listOneUserById(userId:number){   
      
        const ro = new RequestOption()
       
        return await tr.post(getActToolUrl(), {
            action : 'listOneUserById',
            userId : userId
        }, ro)
    }
 
}
