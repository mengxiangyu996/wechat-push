const schedule = require('node-schedule');
const getWeather = require("./weather")
const getLove = require("./love")
const { getAccessToken, sendTmeplate } = require("./wechat");
const getConfig = require("./config");

async () => {
    try {
        let weather = await getWeather();
        let love = await getLove();
        let accessToken = await getAccessToken();

        let body = {
            "template_id": getConfig("wechatTemplateId"),
            "url": "https://weixin.qq.com",
            "data": {
                "date": {
                    "value": new Date().toISOString().slice(0, 10)
                },
                "weather": {
                    "value": weather.text
                },
                "temp": {
                    "value": weather.temp + "°"
                },
                "wind_dir": {
                    "value": weather.windDir
                },
                "tip": {
                    "value": "好好学习，天天向上"
                },
                "love_yue": {
                    "value": love
                }
            },
        }

        if (accessToken != null) {
            let wechatOpenIds = getConfig("wechatOpenId");
            wechatOpenIds.forEach((item) => {
                body.touser = item
                // 发送
                sendTmeplate(accessToken, body)
            })
        }

    } catch (error) {
        console.error("运行出错:", error.message);
    }
}
