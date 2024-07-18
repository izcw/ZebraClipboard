import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ElNotification } from 'element-plus';
import { apiGetHistorinfo } from '@/api/historinfo.js';
import { useRouter } from 'vue-router';

// 定义跳转函数
let Jumprouter = (data, router) => {
    console.log("点击了");
    console.log(data);
    router.push({ path: '/chat/realinfo', query: { id: data.id || 2 } });
};

const historinfoData = ref([]);
const getGetHistorinfo = async () => {
    try {
        // const response = await apiGetHistorinfo({ _page: 3, _limit: 10 });
        const response = await apiGetHistorinfo();
        historinfoData.value = response.reverse();
        console.log(historinfoData.value);
    } catch (error) {
        console.error('获取不到数据:', error);
    }
};
getGetHistorinfo();

export function useWebSocket() {
    const router = useRouter(); // 在函数内部获取路由实例
    const message = ref([{
        identity: 'socket',
        type: 'info',
        user: 'info',
        content: '等待服务器消息...'
    }]);
    const connectionStatus = ref('正在连接 WebSocket...');
    let socket;

    // 建立 WebSocket 连接
    const setupWebSocket = () => {
        socket = new WebSocket('ws://www.comm.duoyu.link');

        socket.onopen = () => {
            connectionStatus.value = 'WebSocket 连接成功';
            message.value[0] = {
                identity: 'socket',
                type: 'success',
                user: 'success',
                content: 'WebSocket 连接成功'
            };
        };

        socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            message.value.push(data);

            ElNotification({
                title: data.user,
                icon: "ChatDotSquare",
                message: data.content,
                onClick: () => Jumprouter(data, router) // 传递router作为参数
            });

            getGetHistorinfo();

            console.log(message.value);
            console.log('实时通信');
        };

        socket.onclose = () => {
            connectionStatus.value = 'WebSocket 连接已关闭';
            message.value.push({
                identity: 'socket',
                type: 'info',
                user: 'close',
                content: 'WebSocket 连接已关闭'
            });
        };

        socket.onerror = (error) => {
            connectionStatus.value = 'WebSocket 连接错误';
            console.error('WebSocket 连接错误:', error);
            message.value.push({
                identity: 'socket',
                type: 'error',
                user: 'error',
                content: 'WebSocket 连接错误!!'
            });
        };
    };

    // 在组件挂载时建立 WebSocket 连接
    onMounted(() => {
        setupWebSocket();
    });

    // 在组件即将被卸载前关闭 WebSocket 连接
    onBeforeUnmount(() => {
        console.log('卸载前关闭 WebSocket 连接');
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
        }
    });

    return {
        message,
        connectionStatus,
        historinfoData
    };
}
