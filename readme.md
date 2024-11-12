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
🤗早上好吖~ {{name.DATA}}
📅今天是：{{today.DATA}}
🏙️当前城市：{{city.DATA}}
🌞今日天气：{{weather.DATA}}
🌡️今日温度：{{temperature.DATA}}
🌅日出时间：{{sunrise.DATA}}
🌇日落时间：{{sunset.DATA}}

还有 {{birthday.DATA}} 天就要吃🎂啦，所以我们今天吃 {{food.DATA}} 预热一下吧

tips：记得出门带好随身物品哦~
```
