<template>
    <div class="commonblock">
        <div>
            <!-- <el-popover placement="top-start" title="" :width="200" trigger="hover" content="未实现此功能">
                <template #reference>
                    <div class="Horizontal">
                        <el-text class="mx-1">有&ensp;效&ensp;期</el-text>
                        <el-select v-model="Setting.ExpirationTime" placeholder="请选择过期时间" disabled>
                            <el-option v-for="item in optionsTime" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                </template>
            </el-popover>
            <el-popover placement="top-start" title="" :width="200" trigger="hover" content="未实现此功能">
                <template #reference>
                    <div class="Horizontal">
                        <el-text class="mx-1">设置密码</el-text>
                        <el-input v-model="jiantebanData.passwd" type="number " placeholder="请输入4位密码" minlength="4"
                            maxlength="4" disabled />
                    </div>
                </template>
            </el-popover> -->
            <div class="Horizontal">
                <el-text class="mx-1">只读</el-text>
                <el-switch v-model="Setting.Readonly" disabled />
            </div>
            <!-- <div class="Horizontal" v-if="Setting.Readonly">
                <el-text class="mx-1">阅后即焚</el-text>
                <el-switch v-model="Setting.Burn" />
            </div> -->
        </div><!-- 设置 -->

        <div class="QRcode">
            <vue-qrcode :value="Qrcode.qrCodeValue" id="qrCodeDom" style="user-select:none;"
                :width="Qrcode.qrCodeWidth"></vue-qrcode>

            <el-text class="mx-1" style="cursor: pointer;user-select:none;margin-bottom: 10px;" @click="handleDownload">
                <el-icon>
                    <Download />
                </el-icon>下载二维码
            </el-text>
            <div>
                <div>
                    <div @click="copytext(Qrcode.qrCodeValue)">
                        <p style="user-select: none;margin:2rem 0 10px 0;">分享链接（点击复制）：</p>
                        <p style="margin:0px 0 2rem 0;"><span>{{ Qrcode.qrCodeValue }}</span></p>
                    </div>
                </div>
                <!-- <div
                    style="margin-top: 1rem;color: var(--vp-c-text-1);display: flex;align-items: center;user-select: none;">
                    <el-icon>
                        <Edit />
                    </el-icon>&nbsp;
                    <el-link href="/docs/user/index.html" style="color: var(--vp-c-text-1);" disabled>自定义域名（暂未实现）</el-link>
                </div> -->
            </div> <!-- 链接 -->
        </div><!-- 二维码 -->

        <div class="commonblock">
            <p>创建时间：<span>{{ formattedUserData.create }}</span></p>
            <p>更新时间：<span>{{ formattedUserData.changetime }}</span></p>
            <!-- <p>上次查看：<span>2024年6月18日 00点29分</span></p>
            <p><el-countdown @click="reset" title="过期删除时间" format="HH:mm:ss" :value="value1" /></p>
            <p>查看次数：<span>1</span></p> -->
        </div>
        <button @click="sendData">传递数据</button>
    </div>
</template>

<script setup>
import { ref, watch, inject, computed, onMounted, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { formatTime } from '../../../../utils/formatTime.js'

// 定义触发的事件
const emit = defineEmits(['update']);

const sendData = () => {
    // 触发自定义事件 'update'，并传递数据
    emit('update', '来自子组件的数据');
}


// 使用 inject 接收父组件提供的数据
// const dataUser = inject('dataUser')

const jiantebanData = inject('jiantebanData')
// console.log("为什么");
// console.log(jiantebanData.value);

// onMounted(() => {
//     console.log('jiantebanData:', jiantebanData)
// })

// 格式化数据
const formattedUserData = computed(() => {
    if (jiantebanData.value && Array.isArray(jiantebanData.value.data)) {
        return jiantebanData.value.data.map(item => ({
            ...item,
            changetime: formatTime(jiantebanData.value.changetime, 'YYYY年MM月DD日 hh时mm分ss秒'),
            create: formatTime(jiantebanData.value.create, 'YYYY年MM月DD日 hh时mm分ss秒'),
        }))[0];
    }
    return [];
})


let Setting = ref({
    passwd: "",
    ExpirationTime: "永久",
    Readonly: true,
    Burn: false,
})

const currentUrl = ref(window.location.origin)
let Qrcode = ref(
    {
        qrCodeValue: currentUrl.value + '/query.html?id=' + jiantebanData.value.id,
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
        value: 'Option0',
        label: '5分钟',
    },
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
    {
        value: 'Option7',
        label: '永久',
    },
]


// 复制文本到剪贴板
const copytext = (text) => {
    // 创建一个临时 textarea
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    try {
        document.execCommand('copy')
        ElMessage({
            message: '复制成功',
            type: 'success',
        })
    } catch (err) {
        ElMessage({
            message: '复制失败',
            type: 'error',
        })
    }
    document.body.removeChild(textarea)
    
    // 切换复制状态
    copystatus.value = true
    setTimeout(() => {
        copystatus.value = false
    }, 500)
}
</script>

<style scoped>
.commonblock {
    width: 100%;
}

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

p {
    font-size: 14px;
    line-height: 18px;
    color: var(--vp-c-brand-1);
}

p span {
    color: var(--vp-c-text-1);
}
</style>