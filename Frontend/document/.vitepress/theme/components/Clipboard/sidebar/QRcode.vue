<template>
    <div class="commonblock">

        <div class="Horizontal">
            <el-text class="mx-1">有&ensp;效&ensp;期</el-text>
            <el-select v-model="Setting.ExpirationTime" placeholder="请选择过期时间">
                <el-option v-for="item in optionsTime" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="Horizontal">
            <el-text class="mx-1">设置密码</el-text>
            <el-input v-model="Setting.passwd" placeholder="请输入4位密码" minlength="4" maxlength="4" />
        </div>
        <div class="Horizontal">
            <el-text class="mx-1">只读</el-text>
            <el-switch v-model="Setting.Readonly" />
        </div>
        <div class="Horizontal" v-if="Setting.Readonly">
            <el-text class="mx-1">阅后即焚</el-text>
            <el-switch v-model="Setting.Burn" />
        </div>
        <div class="QRcode">
            <vue-qrcode :value="Qrcode.qrCodeValue + Setting.passwd" id="qrCodeDom" style="user-select:none;"
                :width="Qrcode.qrCodeWidth"></vue-qrcode>
            <div style="width:100%;margin-bottom: 1rem;display: flex;align-items: center;padding:0 12px;">
                <el-icon>
                    <Link />
                </el-icon>&nbsp;
                <el-text @click="copylink()" style="max-width:250px;width:100%;padding-right:12px;">{{
                Qrcode.qrCodeValue
            }}</el-text>
            </div>
            <el-text class="mx-1" style="cursor: pointer;user-select:none;margin-bottom: 1rem;" @click="handleDownload">
                <el-icon>
                    <Download />
                </el-icon>下载二维码
            </el-text>
        </div>
        <div style="margin-top: 1rem;color: var(--vp-c-text-1);display: flex;align-items: center;">
            <el-icon>
                <Edit />
            </el-icon>&nbsp;
            <el-link href="/docs/user/index.html" style="color: var(--vp-c-text-1);">自定义域名</el-link>
        </div>

    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
let Setting = ref({
    passwd: "",
    ExpirationTime: "3天",
    Readonly: false,
    Burn: false,
})

let Qrcode = ref(
    {
        qrCodeValue: 'https://www.zebra.duoyu.link/docs/clipboard/clipboard.html',
        qrCodeWidth: 300
    }
)
// 二维码下载
let handleDownload = () => {
    let qrCodeSrc = document.getElementById('qrCodeDom').src;
    const link = document.createElement('a');
    link.href = qrCodeSrc;
    link.download = 'qrcode.png';
    link.click();
}

// 复制链接
const copylink = () => {
    ElMessage({
        message: '复制成功',
        type: 'success',
    })
}


// 监听只读开关，如果为false，阅后即焚也需要关闭
watch(
    () => Setting.value.Readonly,
    (newVal, oldVal) => {
        if (newVal == false) {
            Setting.value.Burn = false
        }
    }
)
const optionsTime = [
    {
        value: 'Option1',
        label: '1小时',
    },
    {
        value: 'Option2',
        label: '1天',
    },
    {
        value: 'Option3',
        label: '2天',
    },
    {
        value: 'Option4',
        label: '3天',
    },
    {
        value: 'Option5',
        label: '1周',
    },
    {
        value: 'Option6',
        label: '14天',
    },
    {
        value: 'Option7',
        label: '1个月',
    },
]
</script>

<style scoped>
.el-text {
    margin-right: 10px;
}

.QRcode {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 6px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
}

.Horizontal .el-text {
    color: var(--vp-c-text-1) !important;
}
</style>