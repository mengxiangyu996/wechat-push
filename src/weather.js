const getConfig = require("./config");
const axios = require("axios");

// 天气
const getWeather = async () => {

    const url = "https://devapi.qweather.com/v7/weather/now?location=" + getConfig("qweatherLocationId") + "&key=" + getConfig("qweatherKey");
    
    const response = await axios.get(url, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.data.code == 200) {
        return response.data.now;
    }
};

module.exports = getWeather;