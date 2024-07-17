// 生成用户浏览器唯一标识码和设置验证码
import { watch, ref } from 'vue';
import axios from '../../utils/axios.js';  // 导入自定义的 axios 实例
import { storeToRefs } from 'pinia';
import { generateEnhancedFingerprint } from '../../utils/fingerprint.js';
import { monitorstorage } from './monitorLocalstorage.js';
import { piniaUser } from '../../store/user.js';

export const Fingerverificode = () => {
    const store = piniaUser();
    monitorstorage(store);
    const { counter, data, accountnumber } = storeToRefs(store);

    const users = ref([]);
    const Myusers = ref([]);

    // 获取用户数据的异步函数
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/user');
            users.value = response.data;
            let usercreateStatus = false;

            // 使用 forEach 遍历用户列表，检查并更新用户信息
            users.value.forEach(async (item) => {
                if (item.Browserid.user === accountnumber.value.Browserid.user) {
                    usercreateStatus = true;
                    if (!item.VerifiCodeTime || isTimestampExpired(item.VerifiCodeTime)) {
                        let currentTime = Math.floor(Date.now() / 1000);
                        item.VerifiCodeTime = String(currentTime);
                        item.VerifiCode = generateRandomCode();
                    }
                    const response2 = await axios.put('/user/' + item.id, item);
                    Myusers.value = response2.data;
                }
            });

            // 如果没有找到用户，则创建新用户
            if (!usercreateStatus) {
                let cTime = Math.floor(Date.now() / 1000);
                let newUser = {
                    id: generateUniqueID(),
                    wechat: {
                        user: ""
                    },
                    Browserid: {
                        user: accountnumber.value.Browserid.user
                    },
                    VerifiCode: generateRandomCode(),
                    VerifiCodeTime: cTime,
                    create: cTime
                };
                const response3 = await axios.post('/user', newUser);
                users.value.push(response3.data);
                Myusers.value = response3.data;
            }
        } catch (error) {
            console.error("获取数据时出错：", error);
        }
    };

    // 判断时间戳是否过期
    function isTimestampExpired(timestamp) {
        // 获取当前时间的时间戳（秒级）
        const currentTimestamp = Math.floor(Date.now() / 1000);

        // 计算时间戳之间的差值（秒数）
        const difference = currentTimestamp - timestamp;

        // 定义过期时间阈值（3秒，转换为秒数）
        const expirationThreshold = 3;

        // console.log(difference+" >= "+expirationThreshold+" 秒后刷新验证码");

        // 判断差值是否大于过期时间阈值
        return difference >= expirationThreshold;
    }

    // 随机生成4位数验证码
    function generateRandomCode() {
        // 生成一个 1000 到 9999 之间的随机整数
        const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        return code.toString(); // 将数字转换为字符串返回
    }

    // 随机生成唯一ID
    function generateUniqueID() {
        // 获取当前时间戳
        const timestamp = Date.now().toString();

        // 生成四位随机小写字母
        const letters = Array.from({ length: 4 }, () =>
            String.fromCharCode(Math.floor(Math.random() * 26) + 97) // 97 是 'a' 的 ASCII 码
        ).join('');

        // 从时间戳中提取四位数字
        const numbers = timestamp.slice(-4); // 获取时间戳的最后四位数字

        return letters + numbers;
    }

    // 获取用户指纹并进行处理
    const userFingerprint = ref('');
    const fingerprint = (val) => {
        const getGenerateEnhanced = async () => {
            try {
                const fingerprint = await generateEnhancedFingerprint();
                userFingerprint.value = fingerprint;
            } catch (error) {
                console.error('生成指纹时出错：', error);
            }
        };

        if (!val.Browserid.user) {
            getGenerateEnhanced().then(() => {
                fetchUsers();
            });
        } else {
            userFingerprint.value = val.Browserid.user;
            fetchUsers();
        }
    };

    fingerprint(accountnumber.value);

    const setAccountnumbers = () => {
        store.setAccountnumber(userFingerprint.value);
    };

    watch(
        () => userFingerprint.value,
        () => {
            setAccountnumbers();
        },
        { deep: true }
    );

    return {
        Myusers,
        fetchUsers
    };
};
