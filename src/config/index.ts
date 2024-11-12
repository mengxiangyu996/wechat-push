import * as fs from "fs";

export interface Config {
    WECHAT_APP_ID: string;
    WECHAT_APP_SECRET: string;
    WECHAT_OPEN_ID: string[];
    QWEATHER_KEY: string;
    QWEATHER_LOCATION_ID: string;
    NAME: string;
    CITY: string;
    BIRTHDAY: string;
    ISLUNAR: boolean;
    FOOD: string[];
}

interface env {
    WECHAT_APP_ID: string;
    WECHAT_APP_SECRET: string;
    WECHAT_OPEN_ID: string;
    QWEATHER_KEY: string;
    QWEATHER_LOCATION_ID: string;
    NAME: string;
    CITY: string;
    BIRTHDAY: string;
    ISLUNAR: string;
    FOOD: string;
}

// 读取.env文件
export default function loadConfig(): Config {
    const envContent = fs.readFileSync(".env", "utf-8");

    const envConfig: Partial<env> = {};

    envContent.split("\n").forEach(line => {
        if (line && !line.startsWith("#")) {
            const [key, value] = line.split("=");
            if (key && value) {
                envConfig[key.trim() as keyof env] = value.trim();
            }
        }
    })

    return {
        WECHAT_APP_ID: envConfig.WECHAT_APP_ID as string,
        WECHAT_APP_SECRET: envConfig.WECHAT_APP_SECRET as string,
        WECHAT_OPEN_ID: envConfig.WECHAT_OPEN_ID?.split(",") as string[],
        QWEATHER_KEY: envConfig.QWEATHER_KEY as string,
        QWEATHER_LOCATION_ID: envConfig.QWEATHER_LOCATION_ID as string,
        NAME: envConfig.NAME as string,
        CITY: envConfig.CITY as string,
        BIRTHDAY: envConfig.BIRTHDAY as string,
        ISLUNAR: envConfig.ISLUNAR == "true",
        FOOD: envConfig.FOOD?.split(",") as string[],
    };
}