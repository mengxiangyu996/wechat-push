### 使用说明
```
# 克隆项目
git clone git@github.com:ZeroMxy/wechat-push.git

# 进入目录
cd wechat-push

# 修改配置文件
mv env.json.example env.json

# 安装依赖
npm install

# 启动服务
npm start
```
### 模板消息

> 每日提醒

```
🤞今天是{{date.DATA}}
🌤今天天气: {{weather.DATA}}
🌡当前气温: {{temp.DATA}}度
🎂距离你的生日还有{{birthdays.DATA}}天
```