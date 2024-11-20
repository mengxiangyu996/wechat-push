import axios, { AxiosInstance } from "axios";
import { AxiosConfig } from "./config";

// 创建实例
export const createAxiosInstance = (config?: AxiosConfig): AxiosInstance => {

    const instance = axios.create({
        baseURL: config?.baseURL || process.env.VUE_APP_BASE_URL,
        timeout: config?.timeout || 10000,
        headers: config?.headers || {
            "Content-Type": "application/json",
        },
    });

    // 添加请求拦截器
    instance.interceptors.request.use(config => {
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(response => {
        return response;
    }, error => {
        return Promise.reject(error);
    });

    return instance;
}