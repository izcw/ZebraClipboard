import axios from '../../utils/axios';
import { generateUniqueID } from '../../utils/generateUniqueID.js';

// 获取用户数据
export const NewDataUser = async () => {
    try {
        const response = await axios.get('/user');
        let fingeMark = localStorage.getItem('fingeMark')
        let dataFilter = response.data.find(item => item.Browserid.user === fingeMark);

        // 如果没有就新建用户
        if (dataFilter == undefined) {
            let cTime = Math.floor(Date.now() / 1000);
            let newUser = {
                id: generateUniqueID(),
                wechat: {
                    user: ""
                },
                Browserid: {
                    user: fingeMark
                },
                VerifiCode: generateRandomCode(response.data),
                VerifiCodeTime: String(cTime),
                create: String(cTime),
                limitationID: "1"
            };
            await axios.post('/user', newUser);
        }
    } catch (error) {
        console.error("获取用户信息时出错:", error);
    }
};

function generateRandomCode(data) {
    // 创建一个集合来存储唯一的 VerifiCode
    const verifiCodeSet = new Set();
    // 遍历 users.value 数组并提取 VerifiCode
    data.forEach(user => {
        verifiCodeSet.add(user.VerifiCode);
    });
    let code;
    do {
        // 生成一个1000到9999之间的4位数随机码
        code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    } while (verifiCodeSet.has(code)); // 如果生成的code已经存在于集合中，则重新生成

    // 将新生成的code添加到集合中，以便下次调用时不会重复
    verifiCodeSet.add(code);
    return String(code); // 返回生成的唯一4位数随机码
}