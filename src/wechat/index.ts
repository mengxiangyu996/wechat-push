import loadConfig, { Config } from "../config";
import { request } from "../utils/request";

// 定义微信 API 响应的类型
interface AccessTokenResponse {
    access_token?: string;
    errcode?: number;
    errmsg?: string;
}

// access token
export const getAccessToken = async (): Promise<string | null> => {

    const config: Config = loadConfig();

    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.WECHAT_APP_ID}&secret=${config.WECHAT_APP_SECRET}`;

    try {
        const response: AccessTokenResponse = await request(url, "get");

        if (response.errcode === undefined) {
            return response.access_token || null; // 确保返回值为 string 或 null
        }
    } catch (error) {
        console.error("获取 Access Token 时出错:", error);
    }

    return null;
}

// 发送模板消息
export interface TemplateMessageBody {
    // 根据实际发送的模板消息的结构定义字段
    touser?: string; // 接收者的 openid
    template_id: string; // 模板 ID
    url: string; // 模板消息的 URL
    data: object; // 模板数据
}

export const sendTemplate = async (accessToken: string | null, body: TemplateMessageBody): Promise<void> => {
    if (!accessToken) {
        console.log("accessToken为空");
        return;
    }
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`;
    try {
        const response = await request(url, "post", body);
        console.log("发送模板消息响应：", response);
    } catch (error) {
        console.error("发送模板消息时出错:", error);
    }
}
