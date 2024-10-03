import { getEnv } from "./env";
import axios, { AxiosResponse } from "axios";

// 定义天气信息的类型
export interface WeatherNow {
    obsTime: string; // 观测时间
    temp: string; // 当前温度
    feelsLike: string; // 体感温度
    icon: string; // 天气图标代码
    text: string; // 天气描述
    wind360: string; // 风向（360度）
    windDir: string; // 风向（文字）
    windScale: string; // 风力等级
    windSpeed: string; // 风速
    humidity: string; // 湿度
    precip: string; // 降水量
    pressure: string; // 气压
    vis: string; // 能见度
    cloud: string; // 云量
    dew: string; // 露点温度
}

// 定义 API 响应的类型
interface WeatherResponse {
    code: string;
    now: WeatherNow;
}

// 天气
export const getWeather = async (): Promise<WeatherNow | undefined> => {
    const url = `https://devapi.qweather.com/v7/weather/now?location=${getEnv("qweatherLocationId")}&key=${getEnv("qweatherKey")}`;

    try {
        const response: AxiosResponse<WeatherResponse> = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.data.code === "200") {
            return response.data.now;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // 处理错误情况
    }

    return undefined; // 如果未返回数据，返回 undefined
};
