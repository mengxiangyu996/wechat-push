import { createAxiosInstance } from "../../axios";
import { AxiosConfig } from "../../axios/config";

export const request = async <T>(url: string, method: string, data?: any, config?: AxiosConfig): Promise<T> => {
    // 创建实例
    let instance = createAxiosInstance(config);

    try {
        let response = await instance.request({
            url,
            method,
            data,
        });

        if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}, message: ${response.statusText}`);
        }
        
        return response.data as T;
    } catch (error) {
        throw error;
    }

}
