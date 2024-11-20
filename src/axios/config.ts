import { AxiosRequestConfig } from "axios";

// 定义配置接口
export interface AxiosConfig extends AxiosRequestConfig {
    baseURL: string;
    timeout: number;
    headers: Record<string, string>;
}