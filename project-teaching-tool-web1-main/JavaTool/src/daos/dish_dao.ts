import ToolRequest from '@/base/newToolAxios'
import RequestOption from '@/base/RequestOption'
import { getActToolUrl } from '@/base/constant'
const tr = new ToolRequest()

export default class DishDao {
    /**
     * 列出所有菜品
     * @returns
     */
    async listAll(){
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action : 'listAll'
        }, ro)
    }
    /**
     * 删除某个菜品
     * @returns
     */
    async deleteDish(dishId:number){
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action : 'deleteDish',
            dishId : dishId
        }, ro)
    }
    /**
     * 新增某个菜品
     * @returns
     */
    async saveDish(dish:any){
        const ro = new RequestOption()
        return await tr.get(getActToolUrl(), {
            action : 'saveDish',
            name : dish.name,
            price : dish.price * 100,
            desc : dish.desc
        }, ro)
    }
}
