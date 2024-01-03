const axios = require("axios");

// 土味情话
const getLove = async () => {

    const url = "https://api.8uid.cn/api/qh.php";

    const response = await axios.get(url, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.data.length > 20) {
        return getLove()
    }
    return response.data;
}

module.exports = getLove