<template>
    <div class="login-box">
        用户唯一： {{ accountnumber.Browserid.user }}
        <div class="internal-box">
            <img src="/QRcode.png" alt="">
            <p>使用微信扫码【关注公众号回复下方验证码】完成登录</p>
        </div>
        <br>
        <p><span v-if="Myusers.VerifiCode">【{{ Myusers.VerifiCode }}】（10分钟有效）</span><span
                v-else>请刷新验证码&emsp;</span><el-tag @click="fetchUsers" type="info" effect="plain"
                style="cursor: pointer;"><el-icon>
                    <RefreshRight />
                </el-icon>刷新验证码</el-tag></p>

        <!-- <Index></Index> -->
        <!-- 登录
        <hr>
        <el-link href="/docs/user/index.html" style="color: var(--vp-c-text-1);">我的主页</el-link> -->
    </div>
</template>
<script setup>
import axios from '../../../utils/axios';  // 导入自定义的 axios 实例
import { Fingerverificode } from '../../hooks/Fingerverificode.js';
import { ref, onMounted } from 'vue'

// pinia
import { storeToRefs } from 'pinia';
import { monitorstorage } from '../../hooks/monitorLocalstorage.js';
import { piniaUser } from '../../../store/user.js';
const store = piniaUser();
monitorstorage(store);
const { counter, data, accountnumber } = storeToRefs(store);

const { Myusers, fetchUsers } = Fingerverificode()

// 更新
const updateUser = async () => {
    try {
        const response = await axios.put('/user/1', { name: "New Name" });
        console.log("已更新：", response.data);
        // 更新本地用户列表以反映更改
        const updatedUserIndex = Myusers.value.findIndex(user => user.id === 1);
        if (updatedUserIndex !== -1) {
            Myusers.value[updatedUserIndex] = response.data;
        }
    } catch (error) {
        console.error("更新用户时出错：", error);
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
