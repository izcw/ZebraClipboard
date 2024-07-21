<template>
    <div>
        <div class="login-box" v-if="dataUser.wechat.user == ''">
            <div class="internal-box">
                <img src="/wechatqr.jpg" alt="二维码">
                <p>使用微信扫码【关注公众号"回复"下方验证码】完成登录</p>
            </div>
            <br>
            <p>
                <!-- 显示验证码或者提示用户刷新验证码 -->
                <span v-if="dataUser">【{{ dataUser.VerifiCode }}】（10分钟有效）</span>
                <span v-else>请刷新验证码&emsp;</span>
                <el-button size="small" @click="RefreshVerificationCode" round>
                    <el-icon>
                        <RefreshRight />
                    </el-icon>检查验证码是否过期
                </el-button>
            </p>
        </div>
        <div v-else>
            <UserIndex></UserIndex>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from '../../../utils/axios';
import { ElNotification, ElMessage } from 'element-plus';
import configuration from '../../../utils/config.js';

// 用户数据
let dataUser = ref({
    id: "",
    wechat: {
        user: ""
    },
    Browserid: {
        user: ""
    },
    VerifiCode: "",
    VerifiCodeTime: "",
    create: "",
    limitationID: "1"
})
let dataUserAll = ref()

// 获取用户数据
const getDataUser = async () => {
    const response = await axios.get('/user');
    dataUserAll.value = response.data
    let fingeMark = ''
    if (typeof window !== 'undefined') {
         fingeMark = localStorage.getItem('fingeMark')
    }
    dataUser.value = response.data.find(item => item.Browserid.user === fingeMark);
    // console.log(dataUser.value);
    RefreshVerificationCode()
}
getDataUser()

// 检查是否需要更新验证码和时间
let RefreshVerificationCode = async () => {
    if (dataUser?.value?.VerifiCodeTime && isTimestampExpired(dataUser.value.VerifiCodeTime)) {
        let currentTime = Math.floor(Date.now() / 1000);
        dataUser.value.VerifiCodeTime = String(currentTime);
        dataUser.value.VerifiCode = generateRandomCode();
        await axios.put('/user/' + dataUser.value.id, dataUser.value);
    }
}

// 判断时间戳是否过期
// 定义过期时间阈值（10分钟，转换为秒数）
const EXPIRATION_THRESHOLD = 10 * 60;
function isTimestampExpired(timestamp) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // 获取当前时间的时间戳（秒级）
    const difference = currentTimestamp - timestamp; // 计算时间戳之间的差值（秒数）
    console.log(difference+"/"+EXPIRATION_THRESHOLD);
    return difference >= EXPIRATION_THRESHOLD; // 判断差值是否大于过期时间阈值
}

// 生成唯一的验证码
function generateRandomCode() {
    // 创建一个集合来存储唯一的 VerifiCode
    const verifiCodeSet = new Set();
    // 遍历 dataUserAll.value 数组并提取 VerifiCode
    dataUserAll.value.forEach(user => {
        verifiCodeSet.add(user.VerifiCode);
    });
    let code;
    do {
        // 生成一个1000到9999之间的4位数随机码
        code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    } while (verifiCodeSet.has(code)); // 如果生成的code已经存在于集合中，则重新生成
    // 将新生成的code添加到集合中，以便下次调用时不会重复
    verifiCodeSet.add(code);
    return code; // 返回生成的唯一4位数随机码
}

// WebSocket 连接状态
const connectionStatus = ref('正在连接 WebSocket...');
let socket;

// 设置 WebSocket 连接
const setupWebSocket = () => {
    socket = new WebSocket(configuration.urlport4011);

    socket.onopen = () => {
        connectionStatus.value = 'WebSocket 连接成功';
        console.log(connectionStatus.value);
    };

    socket.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'wechat') {
            // 验证码匹配时更新用户信息
            getDataUser()

            if (dataUser.value.VerifiCode == data.content) {
                console.log(dataUser.value.VerifiCode + "验证码" + data.content);
                console.log("验证码匹配，注册成功");
                ElNotification({
                    title: "用户" + data.user,
                    icon: "ChatDotSquare",
                    message: "发送的" + data.content + "验证码匹配成功，注册、登录成功",
                });
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
                dataUser.value.wechat.user = data.user;
                dataUser.value.limitationID = "2";
                await axios.put('/user/' + dataUser.value.id, dataUser.value);
                getDataUser()
            }
        }
        console.log('实时通信数据:', data);
    };

    socket.onclose = () => {
        connectionStatus.value = 'WebSocket 连接已关闭';
        console.log(connectionStatus.value);
    };

    socket.onerror = (error) => {
        connectionStatus.value = 'WebSocket 连接错误';
        console.error('WebSocket 连接错误:', error);
    };
};

// 在组件挂载时建立 WebSocket 连接
onMounted(() => {
    setupWebSocket();
});

// 在组件卸载前关闭 WebSocket 连接
onBeforeUnmount(() => {
    console.log('卸载前关闭 WebSocket 连接');
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
    }
});
</script>

<style scoped>
.login-box {
    width: 100%;
    height: 100%;
    margin: 120px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.internal-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--vp-c-divider);
    padding: 3rem 2rem;
}

.internal-box img {
    width: 200px;
    height: 200px;
}

.el-tag__content {
    display: flex;
    align-items: center;
}
</style>
