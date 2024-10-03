import moment from 'moment-timezone';
import 'moment-lunar';
import { getEnv } from "./env";

export const getBirthday = (() => {
    let birthdayDate: moment.Moment;
    const birthday = getEnv("birthday") as string;
    const isLunar = getEnv("isLunar") as boolean;

    // 确保 birthday 是有效日期
    if (!moment(birthday, 'YYYY-MM-DD', true).isValid()) {
        throw new Error(`Invalid birthday format: ${birthday}`);
    }

    // 使用 Asia/Shanghai 时区处理生日
    const timezone = "Asia/Shanghai";

    if (isLunar) {
        // 使用 moment-lunar 处理阴历
        birthdayDate = moment.tz(birthday, 'YYYY-MM-DD', timezone).lunar();
    } else {
        // 如果是阳历
        birthdayDate = moment.tz(birthday, timezone);
    }

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
