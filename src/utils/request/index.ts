import { createAxiosInstance } from "../../axios";
import { AxiosConfig } from "../../axios/config";

export interface RequestConfig {
    url: string;
    method: string;
    headers?: Record<string, string>;
    params?: any;
    data?: any;
    config?: AxiosConfig;
}

export default async <T>(config: RequestConfig): Promise<T> => {

    const axiosInstance = createAxiosInstance(config.config);

    try {
        let response = await axiosInstance({
            url: config.url,
            method: config.method,
            headers: config.headers,
            params: config.params,
            data: config.data,
        });

        if (response.status != 200) {
            throw new Error(`Request failed with status ${response.status}, message: ${response.statusText}`);
        }

        return response.data as T;
    } catch (error) {
        throw error;
    }
}
