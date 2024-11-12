export interface DefaultConfig {
    timeout: number;
    responseType: "json" | "text" | "blob" | "formData" | "arrayBuffer";
    headers: Record<string, string>;
}

const defaultConfig: DefaultConfig = {
    timeout: 60 * 1000, // 默认超时时间为60秒
    responseType: "json", // 默认响应类型为JSON
    headers: {
        "Content-Type": "application/json",
    },
};

export default defaultConfig;