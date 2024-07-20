<template>
    <div class="user-box">
        <el-card style="max-width: 480px">
            <el-alert title="用户信息：" type="success" :closable="false" />
            <br>
            <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            <p>浏览器指纹： {{ dataUser.Browserid.user }}</p>
            <p v-if="dataUser.wechat.user != ''">微信ID： {{
                dataUser.wechat.user }}</p>
            <a v-else href="/docs/user/login.html"><el-alert title="未登录用户，点击跳转登录" type="warning" :closable="false" /></a>
            <br>
            <br>
            <a href="/clipboard.html"><el-button type="success">去使用在线剪贴板！GO！</el-button></a>
        </el-card>
    </div>
</template>
<script setup>
import { ref } from "vue"
import axios from '../../../utils/axios';
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
const getDataUser = async () => {
    try {
        const response = await axios.get('/user');
        let fingeMark = localStorage.getItem('fingeMark')
        dataUser.value = response.data.find(item => item.Browserid.user === fingeMark);
    } catch (error) {
        console.error("获取用户信息时出错:", error);
    }
}
getDataUser()
</script>
<style scoped>
.user-box {
    padding: 6rem 1rem;
    display: flex;
    justify-content: center;
}
</style>
