import loadConfig, { Config } from "../config";
import moment from 'moment-timezone';
import 'moment-lunar';

export const getBirthday = (() => {
    const config: Config = loadConfig();

    let birthdayDate: moment.Moment;
    const birthday = config.BIRTHDAY;

    // 确保 birthday 是有效日期
    if (!moment(birthday, 'YYYY-MM-DD', true).isValid()) {
        throw new Error(`Invalid birthday format: ${birthday}`);
    }

    // 使用 Asia/Shanghai 时区处理生日
    const timezone = "Asia/Shanghai";

    birthdayDate = moment.tz(birthday, timezone);

    // 获取当前日期，使用指定时区
    const today = moment.tz(timezone);

    // 设置生日年份为当前年份
    birthdayDate.year(today.year());

    // 如果生日已经过了，则设置为下一年
    if (birthdayDate.isBefore(today, 'day')) {
        birthdayDate.add(1, 'year');
    }

    // 计算天数差
    const daysUntilBirthday = birthdayDate.diff(today, 'days');

    return daysUntilBirthday;
});
