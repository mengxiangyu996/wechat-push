import { getEnv } from "./env";
import axios, { AxiosResponse } from "axios";

// 定义微信 API 响应的类型
interface AccessTokenResponse {
    access_token?: string;
    errcode?: number;
    errmsg?: string;
}

// access token
export const getAccessToken = async (): Promise<string | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${getEnv("wechatAppId")}&secret=${getEnv("wechatAppSecret")}`;

    try {
        const response: AxiosResponse<AccessTokenResponse> = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.data.errcode === undefined) {
            return response.data.access_token || null; // 确保返回值为 string 或 null
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

export const sendTemplate = async (accessToken: string, body: TemplateMessageBody): Promise<void> => {
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`;
    try {
       let response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("发送模板消息时出错:", error);
    }
}

export default {
    getAccessToken,
    sendTemplate,
};
