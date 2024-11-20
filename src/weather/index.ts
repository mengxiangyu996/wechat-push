import loadConfig, { Config } from "../config";
import { request } from "../utils/request";

export interface Weather {
    weather: string; // 天气
    temperature: string; // 温度
    // clothes: string; // 穿衣
    sunrise: string; // 日出
    sunset: string; // 日落
}

interface WeatherResponse {
    code: string;
    updateTime: string;
    fxLink: string;
    daily: DailyForecast[];
    refer: Refer;
}

interface DailyForecast {
    fxDate: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moonPhase: string;
    moonPhaseIcon: string;
    tempMax: string;
    tempMin: string;
    iconDay: string;
    textDay: string;
    iconNight: string;
    textNight: string;
    wind360Day: string;
    windDirDay: string;
    windScaleDay: string;
    windSpeedDay: string;
    wind360Night: string;
    windDirNight: string;
    windScaleNight: string;
    windSpeedNight: string;
    humidity: string;
    precip: string;
    pressure: string;
    vis: string;
    cloud: string;
    uvIndex: string;
}

interface Refer {
    sources: string[];
    license: string[];
}

interface ClothesResponse {
    code: string;
    updateTime: string;
    fxLink: string;
    daily: Daily[];
    refer: Refer;
}

interface Daily {
    date: string;
    type: string;
    name: string;
    level: string;
    category: string;
    text: string;
}

export const getWeather = async (): Promise<Weather | null> => {

    const config: Config = loadConfig();

    const weatherUrl = `https://devapi.qweather.com/v7/weather/3d?key=${config.QWEATHER_KEY}&location=${config.QWEATHER_LOCATION_ID}`;
    // const clothesUrl = `https://devapi.qweather.com/v7/indices/1d?key=${config.QWEATHER_KEY}&location=${config.QWEATHER_LOCATION_ID}&type=3`;

    try {
        const weatherResponse: WeatherResponse = await request(weatherUrl, "get");
        if (weatherResponse.code != "200") {
            console.log("获取天气错误：", weatherResponse.code);
            return null;
        }

        // const clothesResponse: ClothesResponse = await request(clothesUrl, "get");
        // if (clothesResponse.code != "200") {
        //     console.log("获取天气错误：", clothesResponse.code);
        //     return null;
        // }

        return {
            weather: weatherResponse.daily[0].textDay,
            temperature: weatherResponse.daily[0].tempMin + "-" + weatherResponse.daily[0].tempMax + "°C",
            // clothes: clothesResponse.daily[0].text,
            sunrise: weatherResponse.daily[0].sunrise,
            sunset: weatherResponse.daily[0].sunset,
        };
    } catch (error) {
        console.log("获取天气错误：", error);
        return null;
    }
};