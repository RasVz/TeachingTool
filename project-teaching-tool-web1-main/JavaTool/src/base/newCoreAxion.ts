import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios' // 引入axios和定义在node_modules/axios/index.ts文件里的类型声明
import qs from 'qs'
import _ from 'lodash'
import { AID, getAccessToken, CORE_URL } from './constant'
import RequestOption from './RequestOption'

const defaultParams = {
    aid: AID,
    format: 'json',
    accessToken: getAccessToken()
}

const defaultHeaders = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'wtbauthc-trust': 'true'
    }
}

const defaultConfigs = {
    withCredentials: true,
    baseURL: process.env.NODE_ENV === 'development' ? '' : CORE_URL
}

class CoreRequest { // 定义一个接口请求类，用于创建一个axios请求实例
    /**
     * 发起GET请求
     * @param url 请求的URI
     * @param params 请求参数
     * @param options 请求选项
     * @returns
     */
    public async get(url: string, params: any, options: RequestOption): Promise<any> {
        console.log(getAccessToken())
        // 处理query参数
        if (params.query) {
            const query = params.query
            if (query.name) {
                query.name = '*' + query.name + '*'
            } else if (query.name === '') {
                query.name = '*'
            }
            params.query = JSON.stringify(params.query)
        }

        const ro: any = {
            method: 'GET',
            url: url + `?accessToken=${getAccessToken()}`,
            params: params
        }
        const o = Object.assign(ro, options)
        return this.request(o)
    }

    /**
     * 发起GET请求
     * @param url 请求的URI
     * @param params 请求参数
     * @param options 请求选项
     * @returns
     */
    public async post(url: string, params: any, options: RequestOption): Promise<any> {
        const ro: any = {
            method: 'POST',
            url: url + `?accessToken=${getAccessToken()}`,
            data: qs.stringify(params)
        }
        const o = Object.assign(ro, options)
        return this.request(o)
    }

    public request(options: AxiosRequestConfig): AxiosPromise { // 我们实际调用接口的时候调用实例的这个方法，他返回一个AxiosPromise
        const instance: AxiosInstance = axios.create() // 这里使用axios.create方法创建一个axios实例，他是一个函数，同时这个函数包含多个属性
        options = this.mergeConfig(options) // 合并基础路径和每个接口单独传入的配置，比如url、参数等
        this.interceptors(instance, options) // 调用interceptors方法使拦截器生效
        return instance(options) // 最后返回AxiosPromise
    }

    private interceptors(instance: AxiosInstance, options: any) { // 定义这个函数用于添加全局请求和响应拦截逻辑
        // 在这里添加请求和响应拦截
        instance.interceptors.request.use((config) => {
            // 接口请求的所有配置，都在这个config对象中，他的类型是AxiosRequestConfig，你可以看到他有哪些字段
            // 如果你要修改接口请求配置，需要修改 axios.defaults 上的字段值
            // 增加分页参数
            if (options.pagination) {
                const pagination = options.pagination
                // 默认的获取模式是刷新
                if (!pagination.command) {
                    pagination.command = 'refresh'
                }
                // 根据命令更新分页参数
                if (pagination.command === 'reset') {
                    pagination.$pagingEnd = false
                    pagination.$pagingStart = true
                    pagination.page = 1
                } else if (pagination.command === 'next' && !pagination.$pagingEnd) {
                    pagination.page++
                } else if (pagination.command === 'previous' && !pagination.$pagingStart) {
                    pagination.page--
                }
                config.params.page = pagination.page
                config.params.count = pagination.count
            }
            return config
        },
            (error) => {
                return Promise.reject(error)
            })
        instance.interceptors.response.use((response: AxiosResponse) => {
            const data = response.data
            let rows
            let total
            if (options.rowsPath && options.totalPath) {
                const rowsPath = options.rowsPath
                const totalPath = options.totalPath
                rows = _.get(data, rowsPath)
                total = _.get(data, totalPath)
                if (!rows || !total) {
                    return Promise.reject(response.data)
                }
            } else {
                rows = data.rows
                total = data.total
            }
            // 数据封装
            if (rows && total) {
                // 处理分页对象
                if (options.pagination) {
                    const pagination = options.pagination
                    pagination.total = total
                    if (pagination.command === 'next' || pagination.command === 'reset') {
                        if (pagination.page * pagination.count > total) {
                            pagination.$pagingEnd = true
                        } else {
                            pagination.$pagingEnd = false
                        }
                    } else if (pagination.command === 'previous') {
                        if (pagination.page === 1) {
                            pagination.$pagingStart = true
                        } else {
                            pagination.$pagingStart = false
                        }
                    }
                }
                // if(options.objType){
                //     const array = []
                //     for(const i in rows){
                //         const obj = new options.objType(rows[i])
                //         array.push(obj)
                //     }
                //     result = array
                // }else{
                //     result = rows
                // }
                // 如果设置sinlgeResult，则从数组中获取第一条记录作为返回对象，如果数组中有多条记录，则返回该数组
                if (options.singleResult) {
                    if (rows.length === 1) {
                        rows = rows[0]
                    } else {
                        throw new Error('参数要求返回单行数据，但是返回结果有多行')
                    }
                }
                return rows
            } else if (total === 0 && rows.length === 0) {
                const pagination = options.pagination
                if (pagination) {
                    if (pagination) {
                        pagination.total = 0
                        pagination.$pagingEnd = true
                    }
                }
                return []
            } else {
                return response
            }
        },
            (error) => { // 这里是遇到报错的回调
                console.error(error)
                return Promise.reject(error)
            })
    }

    private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig { // 这个方法用于合并基础路径配置和接口单独配置
        // options.params = Object.assign(defaultParams, options.params)
        // return Object.assign(defaultHeaders, defaultConfigs, options)
        const dp = { ...defaultParams };
        options.params = Object.assign(dp, options.params);
        return Object.assign(defaultHeaders, defaultConfigs, options);
    }
}
export default CoreRequest
