import loadConfig, { Config } from "./config";

import { getWeather } from "./weather";
import { getBirthday } from "./birthday";
import { getFood } from "./food";
import { getAccessToken, sendTemplate, TemplateMessageBody } from "./wechat";
import moment from 'moment-timezone';
import schedule from 'node-schedule';

// 时区问题，如果想早上7点推送，则需要设置为23点
schedule.scheduleJob("0 0 23 * * *", async () => {
    
    const weather = await getWeather();
    if (!weather) {
        console.log("获取天气失败");
        return;
    }

    const birthday = await getBirthday();
    if (!birthday) {
        console.log("获取生日失败");
        return;
    }

    const food = await getFood();
    if (!food) {
        console.log("获取食物失败");
        return;
    }

    const accessToken: string | null = await getAccessToken();
    if (!accessToken) {
        console.log("获取accessToken失败");
        return;
    }

    const config: Config = loadConfig();

    const body: TemplateMessageBody = {
        template_id: "mpd_S3Lc8hMhi6c25MoIJdGTdxWIEANGkyheRn_qdx4",
        url: "https://weixin.qq.com",
        data: {
            name: {
                value: config.NAME,
            },
            today: {
                value: moment().tz("Asia/Shanghai").format("YYYY-MM-DD"),
            },
            city: {
                value: config.CITY,
            },
            weather: {
                value: weather?.weather,
            },
            temperature: {
                value: weather?.temperature,
            },
            sunrise: {
                value: weather?.sunrise,
            },
            sunset: {
                value: weather?.sunset,
            },
            birthday: {
                value: birthday,
            },
            food: {
                value: food,
            },
        }
    }

    config.WECHAT_OPEN_ID.forEach(async (openId) => {
        body.touser = openId.trim();
        await sendTemplate(accessToken, body);
    })

});
