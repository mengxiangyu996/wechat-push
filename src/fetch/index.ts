import defaultConfig, { DefaultConfig } from "./config";

interface FetchConfig extends Partial<DefaultConfig> {
    options?: RequestInit;
}

class Fetch {
    url: string;
    options: RequestInit;
    timeout: number;
    responseType: "json" | "text" | "blob" | "formData" | "arrayBuffer";

    constructor(url: string, config: FetchConfig = {}) {
        this.url = url;
        this.options = {
            method: "GET", // 默认请求方法为GET
            headers: { ...defaultConfig.headers, ...config.headers },
            ...config.options,
        };
        this.timeout = config.timeout || defaultConfig.timeout;
        this.responseType = config.responseType || defaultConfig.responseType;
    }

    // 设置URL
    setUrl(url: string): this {
        this.url = url;
        return this;
    }

    // 设置请求方法
    setMethod(method: string): this {
        this.options.method = method.toUpperCase();
        return this;
    }

    // 设置请求头
    setHeader(name: string, value: string): this {
        (this.options.headers as Record<string, string>)[name] = value;
        return this;
    }

    // 设置超时时间
    setTimeout(timeout: number): this {
        this.timeout = timeout;
        return this;
    }

    // 设置查询参数，将参数序列化并附加到URL中
    setParam(param: Record<string, any>): this {
        const separator = this.url.includes("?") ? "&" : "?";
        const queryString = Object.entries(param)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join("&");
        this.url += separator + queryString;
        return this;
    }

    // 设置请求体，支持JSON和FormData类型
    setBody(body: Record<string, any> | FormData): this {
        if (body instanceof FormData) {
            this.options.body = body;
        } else {
            this.options.body = JSON.stringify(body);
            this.setHeader("Content-Type", "application/json"); // 设置请求体类型为JSON
        }
        return this;
    }

    // 设置响应类型
    setResponseType(type: "json" | "text" | "blob" | "formData" | "arrayBuffer"): this {
        this.responseType = type;
        return this;
    }

    // 发送请求并处理响应
    async send(): Promise<any> {
        try {
            // 使用Promise.race来实现超时机制
            const response = await Promise.race([
                fetch(this.url, this.options),
                new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error("Request timeout")), this.timeout)
                ),
            ]);

            // 检查响应状态，如果不是200-299则抛出错误
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status} (${response.statusText})`);
            }

            // 根据设置的响应类型解析响应
            switch (this.responseType) {
                case "json":
                    return response.json();
                case "text":
                    return response.text();
                case "blob":
                    return response.blob();
                case "formData":
                    return response.formData();
                case "arrayBuffer":
                    return response.arrayBuffer();
                default:
                    throw new Error(`Unknown response type: ${this.responseType}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                // 捕获并抛出错误，以便在调用方处理
                throw new Error(`Fetch request failed: ${error.message}`);
            }
            throw error;
        }
    }
}

export default Fetch;