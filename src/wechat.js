const getConfig = require("./config");
const axios = require("axios");

// access token
const getAccessToken = async () => {

    const url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + getConfig("wechatAppId") + "&secret=" + getConfig("wechatAppSecret");
    
    const response = await axios.get(url, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.data.errcode == undefined) {
        return response.data.access_token;
    }
    return null
}

// 发送
const sendTmeplate = async (accessToken, body) => {

    const url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + accessToken

    await axios.post(url, body);
}

module.exports = {
    getAccessToken,
    sendTmeplate
}