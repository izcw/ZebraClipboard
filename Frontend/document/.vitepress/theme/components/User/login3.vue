<template>
    <div v-loading="loading">
        <!-- 登录框，只有在用户信息不完整时才显示 -->
        <div class="login-box" v-if="!dataUser.wechat.user" :style="{ opacity: loading ? 0 : 1 }">
            <div class="internal-box">
                <img src="/QRcode.png" alt="二维码">
                <p>使用微信扫码【关注公众号回复下方验证码】完成登录</p>
            </div>
            <br>
            <p>
                <!-- 显示验证码或者提示用户刷新验证码 -->
                <span v-if="Myusers.VerifiCode">【{{ Myusers.VerifiCode }}】（10分钟有效）</span>
                <span v-else>请刷新验证码&emsp;</span>
                <el-button size="small" @click="fetchUsers" :icon="Search" round>
                    <el-icon>
                        <RefreshRight />
                    </el-icon>刷新验证码
                </el-button>
            </p>
        </div>

        <!-- 用户信息已存在时显示用户界面 -->
        <div v-else>
            <UserIndex></UserIndex>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ElNotification } from 'element-plus';
import configuration from '../../../utils/config.js';
import axios from '../../../utils/axios';
// pinia
import { monitorstorage } from '../../hooks/monitorLocalstorage.js';
import { piniaUser } from '../../../store/user.js';
// import { Fingerverificode } from '../../hooks/Fingerverificode.js';

const loading = ref(true)

// 初始化 pinia 用户 store
const store = piniaUser();
monitorstorage(store);

// 绑定到 Fingerverificode 钩子函数
const { Myusers, fetchUsers } = Fingerverificode();

// 组件状态
const MyusersWechat = ref();
const dataUser = ref({
    id: "",
    wechat: { user: "" },
    Browserid: { user: "" },
    VerifiCode: "",
    VerifiCodeTime: "",
    create: "",
    limitationID: ""
});

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
            let huidiao = await fetchUsers();
            if (huidiao.VerifiCode == data.content) {
                console.log(huidiao.VerifiCode + "验证码" + data.content);
                console.log("验证码匹配，注册成功");
                ElNotification({
                    title: "用户" + data.user,
                    icon: "ChatDotSquare",
                    message: "发送的" + data.content + "验证码匹配成功，注册、登录成功",
                });
                updateUser(data);
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
    setTimeout(() => {
        getdataUser(Myusers.value.id);
        loading.value = false
    }, 3000);
});

// 在组件卸载前关闭 WebSocket 连接
onBeforeUnmount(() => {
    console.log('卸载前关闭 WebSocket 连接');
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
    }
});

// 更新用户信息
const updateUser = async (data) => {
    console.log("当前用户信息:", Myusers.value);
    console.log("从 WebSocket 接收到的数据:", data);

    Myusers.value.wechat.user = data.user;
    Myusers.value.limitationID = '2';

    try {
        const response = await axios.put('/user/' + Myusers.value.id, Myusers.value);
        console.log("用户信息已更新:", response.data);
        await getdataUser(Myusers.value.id);
        socket.close();
    } catch (error) {
        console.error("更新用户信息时出错:", error);
    }
};

// 获取用户数据
const getdataUser = async (id) => {
    console.log("获取用户信息，用户ID:", id);
    try {
        const response = await axios.get('/user/' + id);
        dataUser.value = response.data;
        console.log("用户信息已获取:", response.data);
        store.setWehat(dataUser.value.wechat.user);
    } catch (error) {
        console.error("获取用户信息时出错:", error);
    }
};
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