// utils/formatTime.js

/**
 * 格式化时间戳为指定格式的字符串
 * @param {number} timestamp 时间戳（秒）
 * @param {string} format 格式化字符串，例如 'YYYY-MM-DD hh:mm:ss'
 * @returns {string} 格式化后的时间字符串
 */
function formatTime(timestamp, format) {
    // 将时间戳从秒转换为毫秒
    const date = new Date(parseInt(timestamp, 10) * 1000);

    // 定义格式化函数
    const padZero = (num) => (num < 10 ? `0${num}` : num.toString());

    // 替换格式中的占位符
    const formattedDate = format
        .replace('YYYY', date.getFullYear())
        .replace('MM', padZero(date.getMonth() + 1))
        .replace('DD', padZero(date.getDate()))
        .replace('hh', padZero(date.getHours()))
        .replace('mm', padZero(date.getMinutes()))
        .replace('ss', padZero(date.getSeconds()))
        .replace('d', date.getHours()); // 这里假设 'd' 代表不补零的小时

    return formattedDate;
}

module.exports = formatTime;


// const timestamp = Date.now() / 1000; // 假设当前时间戳（秒）
// // 使用不同的格式和符号
// const formatted1 = formatTime(timestamp, 'YYYY-MM-DD hh:mm');
// const formatted2 = formatTime(timestamp, 'YYYY/MM/DD hh:mm');
// const formatted3 = formatTime(timestamp, 'YYYY年MM月DD日 hh时mm分');

// console.log(formatted1); // 输出类似 '2024-07-17 23:18'
// console.log(formatted2); // 输出类似 '2024/07/17 23:18'
// console.log(formatted3); // 输出类似 '2024年07月17日 23时18分'
