import fs from 'fs';

// 定义配置类型
interface Config {
    wechatAppId?: string;
    wechatAppSecret?: string;
    wechatOpenId?: string[];
    qweatherKey?: string;
    qweatherLocationId?: string;
    birthday?: string;
    isLunar?: boolean;
}

// 类型保护函数，检查键是否有效
const isConfigKey = (key: string): key is keyof Config => {
    return ['wechatAppId', 'wechatAppSecret', 'wechatOpenId', 'qweatherKey', 'qweatherLocationId', 'birthday', 'isLunar'].includes(key);
}

// 读取配置文件
export const getEnv = (key: string): string | boolean | string[] | null => {
    if (!isConfigKey(key)) {
        console.error(`无效的键: ${key}`);
        return null;
    }

    try {
        const data = fs.readFileSync("env.json", "utf-8");
        const config: Config = JSON.parse(data);
        const value = config[key];

        if (value === undefined) {
            console.error(`请检查配置文件中是否存在 key: ${key}`);
            return null;
        }

        return value; // 这里直接返回值，不需要转换
    } catch (error) {
        console.error(`读取或解析配置文件错误: ${error instanceof Error ? error.message : error}`);
        return null;
    }
};
