import schedule from 'node-schedule';
import { getWeather, WeatherNow } from './weather';
import { getAccessToken, sendTemplate, TemplateMessageBody } from './wechat';
import { getEnv } from './env';
import { getBirthday } from './birthday';
import moment from 'moment-timezone';

// 需要当前时间减去8小时
schedule.scheduleJob('0 0 8 * * *', async () => {

    try {
        const weather: WeatherNow | undefined = await getWeather();
        const accessToken: string | null = await getAccessToken();

        if (!weather) {
            console.error("获取天气信息失败");
            return;
        }

        const body: TemplateMessageBody = {
            template_id: "2q-eItdTojWUEBb3rVKFZHZ2SoYkSDXC-YtdgjejHVM",
            url: "https://weixin.qq.com",
            data: {
                date: {
                    value: moment().tz("Asia/Shanghai").format("YYYY-MM-DD"),
                },
                weather: {
                    value: weather.text,
                },
                temp: {
                    value: weather.temp,
                },
                birthdays: {
                    value: getBirthday(),
                },
            },
        };

        if (accessToken) {
            const wechatOpenId = getEnv("wechatOpenId");
            if (wechatOpenId && Array.isArray(wechatOpenId)) {
                wechatOpenId.forEach((item) => {
                    body.touser = item;
                    // 发送
                    sendTemplate(accessToken, body);
                });
            } else {
                body.touser = wechatOpenId as string;
                sendTemplate(accessToken, body);
            }
        }
    } catch (error) {
        console.error("运行出错:", (error as Error).message);
    }
});
