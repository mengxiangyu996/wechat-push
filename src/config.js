// 读取配置文件
const fs = require("fs")

const getConfig = function config(key) {

    try {
        const data = fs.readFileSync("env.json", "utf-8");
        const config = JSON.parse(data);
        const value = config[key];

        if (value === undefined) {
            console.error("请检查是否配置key");
            return null;
        }

        return value;
    } catch (error) {
        console.error(`读取或解析配置文件错误: ${error}`);
        return null;
    }
}

module.exports = getConfig