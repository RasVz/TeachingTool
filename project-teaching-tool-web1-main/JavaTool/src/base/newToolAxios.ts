import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'; // 引入axios和定义在node_modules/axios/index.ts文件里的类型声明
import qs from 'qs';
import _ from 'lodash';
import { GATEWAY_URL, TRE_URL } from './constant';

const defaultParams = {
  params: {
    'clientType': 301,
    'returnType': 'VALUE'
  }
};

const defaultHeaders = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
    // "wtbauthc-trust": "true",
  }
}

const defaultConfigs = {
  withCredentials: true,
  timeout: 20000,
  baseURL: process.env.NODE_ENV == 'development' ? '' : GATEWAY_URL
}

class ToolRequest { // 定义一个接口请求类，用于创建一个axios请求实例
  constructor() { // 这个类接收一个字符串参数，是接口请求的基本路径
  }
  /**
   * 发起GET请求
   * @param url 
   * @param params 
   * @param options 
   * @returns 
   */
  public async get(url: string, params: any, options: any): Promise<any> {
    const ro = {
      method: "GET",
      url: url,
      params: params,
    }
    const o = Object.assign(ro, options);
    return this.request(o);
  }

  /**
   * 发起GET请求
   * @param url 
   * @param params 
   * @param options 
   * @returns 
   */
  public async post(url: string, params: any, options: any): Promise<any> {
    console.log('POST')
    const ro = {
      method: "POST",
      url: url,
      data: qs.stringify(params)
    }
    const o = Object.assign(ro, options);
    return this.request(o);
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
      if (options['pagination']) {
        const pagination = options['pagination'];
        //默认的获取模式是刷新
        if (!pagination.command) {
          pagination.command = "refresh";
        }
        //根据命令更新分页参数
        if (pagination.command == "reset") {
          pagination.$pagingEnd = false;
          pagination.$pagingStart = true;
          pagination.page = 1;
        } else if (pagination.command == 'next' && !pagination.$pagingEnd) {
          pagination.page++;
        } else if (pagination.command == 'previous' && !pagination.$pagingStart) {
          pagination.page--;
        }

        config.params['page'] = pagination.page;
        config.params['count'] = pagination.count;
      }
      return config
    },
      (error) => {
        return Promise.reject(error)
      })
    instance.interceptors.response.use((response: AxiosResponse) => {
      const data = response.data;
      let rows;
      let total;
      if (options['rowsPath'] && options['totalPath']) {
        const rowsPath = options['rowsPath'];
        const totalPath = options['totalPath'];

        rows = _.get(data, rowsPath)
        total = _.get(data, totalPath)
        if (!rows || !total) {
          return Promise.reject(response.data);
        }
      } else {
        rows = data.rows;
        total = data.total;
      }
      //数据封装
      if (rows && total) {
        let result: any = "";
        //处理分页对象
        if (options['pagination']) {
          const pagination = options['pagination'];
          pagination.total = total;
          if (pagination.command == 'next' || pagination.command == 'reset') {
            if (pagination.page * pagination.count > total) {
              pagination.$pagingEnd = true;
            } else {
              pagination.$pagingEnd = false;
            }
          } else if (pagination.command == 'previous') {
            if (pagination.page == 1) {
              pagination.$pagingStart = true;
            } else {
              pagination.$pagingStart = false;
            }
          }
        }
        //如果设置了数据的对象类型，则做一下转换
        if (options['objType']) {
          const array = [];
          for (const i in rows) {
            const obj = new options['objType'](rows[i]);
            array.push(obj)
          }
          result = array;
        } else {
          result = rows;
        }
        //如果设置sinlgeResult，则从数组中获取第一条记录作为返回对象，如果数组中有多条记录，则返回该数组
        if (options['singleResult']) {
          if (result.length == 1) {
            result = result[0];
          } else {
            throw new Error("参数要求返回单行数据，但是返回结果有多行");
          }
        }
        //返回结果
        return result;
      } else if (total == 0 && rows.length == 0) {
        const pagination = options['pagination'];
        if (pagination) {
          pagination.total = 0;
          pagination.$pagingEnd = true;
        }
        return [];
      } else {
        return response;
      }
    },
      (error) => { // 这里是遇到报错的回调
        return Promise.reject(error)
      })
  }
  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig { // 这个方法用于合并基础路径配置和接口单独配置
    const dp = { ...defaultParams };//复制对象
    return Object.assign(dp, defaultHeaders, defaultConfigs, options);
    // return Object.assign(defaultParams, defaultHeaders, defaultConfigs, options);
  }
}
export default ToolRequest;
