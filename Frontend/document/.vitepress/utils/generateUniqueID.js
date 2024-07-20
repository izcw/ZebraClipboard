// 随机生成唯一ID
export function generateUniqueID() {
    const timestamp = Date.now().toString();  // 获取当前时间戳
    const letters = Array.from({ length: 4 }, () => // 生成四位随机小写字母
        String.fromCharCode(Math.floor(Math.random() * 26) + 97) // 97 是 'a' 的 ASCII 码
    ).join('');
    // 从时间戳中提取四位数字
    const numbers = timestamp.slice(-4); // 获取时间戳的最后四位数字
    return letters + numbers;
}