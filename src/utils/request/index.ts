import { createAxiosInstance } from "../../axios";
import { AxiosConfig } from "../../axios/config";

export const request = async <T>(url: string, method: string, data?: any, config?: AxiosConfig): Promise<T> => {
    // 创建实例
    let instance = createAxiosInstance(config);

    // 将方法转换为大写
    method = method.toUpperCase();

    try {
        let response = await instance.request({
            url,
            method,
            data,
        });

        return response as T;
    } catch (error) {
        throw error;
    }

}