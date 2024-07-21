<template>
    <div class="boxquery-box editor-box">
        <div>
            <el-input v-model="zebraquery" size="large" style="width: 300px; line-height: 50px;" clearable
                placeholder="使用剪切板ID查看内容" />
            <el-button type="primary" size="large" plain @click="getQuery">查询剪贴板</el-button>
        </div>
        <div v-if="!textStatus"></div>
        <div v-else style="width:100%;">
            <p>用户：{{ data.userName }} 分享的</p>
            <div class="textView" v-for="(item, index) in textContent.data" :key="index">
                <div class="copy-box" @click="copytext(item.content)">
                    <img v-show="!copystatus" src="/images/icon/copy.png" alt="">
                    <img v-show="copystatus" src="/images/icon/answer.png" alt="">
                </div>
                <el-text class="mx-1" type="success">{{ item.name }}</el-text>
                <textarea ref="textareaRef" id="editor-textarea" name="editor-textarea" cols="80" rows="25"
                    class="editor-textarea" v-model="item.content" @input="autoResize">
                </textarea>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from '../../../utils/axios'

const textContent = ref([])
const data = ref({})
const textStatus = ref(false)
const zebraquery = ref('')
const copystatus = ref(false)

// 解析 URL 参数函数
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
}

// 组件挂载时获取 URL 参数并查询
onMounted(() => {
    const queryId = getQueryParam('id')
    if (queryId) {
        zebraquery.value = queryId
        getQuery()
    }
})

// 查询剪贴板数据
const getQuery = async () => {
    textStatus.value = false
    if (!zebraquery.value) {
        ElMessage({
            message: '剪贴板ID不能为空',
            type: 'warning',
        })
        return
    }
    try {
        const response = await axios.get(`/clipboard/${zebraquery.value}`)
        data.value = response.data
        textContent.value = response.data
        textStatus.value = true
    } catch (error) {
        ElMessage({
            message: '没找到',
            type: 'warning',
        })
    }
}

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
<style>
.boxquery-box a {
    text-decoration: none;
    color: var(--vp-c-text-1);
    padding: 0;
    margin: 0;
    margin: 3rem;
}

.boxquery-box {
    margin: 60px 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.boxquery-box .result {
    width: 100%;
    max-width: 300px;
    height: auto;
    padding: 2rem;

    border: 1px solid var(--vp-c-divider);
    cursor: pointer;
    display: flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 6px var(--vp-sidebar-bg-color);


}

.boxquery-box .result p {
    width: 100%;
    word-wrap: break-word;
    word-break: normal;
    font-size: 14px;
}

.boxquery-box .result img {
    width: 80px;
    height: 80px;
    margin-top: 30px;
}

.boxquery-box .result:hover {
    border: 2px solid var(--vp-c-divider);
    color: var(--vp-c-brand-1);
}


/*编辑器*/
.editor-box .ProseMirror {
    width: 100% !important;
    outline: none;
    /*border-bottom: 1px dashed rgb(204, 204, 204);*/
    padding: 0.5rem 1rem;
    min-height: 600px !important;
}

.editor-box .ProseMirror p {
    margin: 0;
    /* line-height: 10px !important;*/
}

.editor-box .ProseMirror h1,
.editor-box .ProseMirror h2,
.editor-box .ProseMirror h3 {
    border-top: none !important;
    padding-top: 0 !important;
}

.editor-box .ProseMirror h1 {
    margin-top: 45px !important;
}

.editor-box .ProseMirror h2 {
    margin-top: 35px !important;
}

.editor-box .ProseMirror h3 {
    margin-top: 25px !important;
}

.editor-box .ProseMirror ul {
    margin-left: 1rem !important;
}

.editor-box .ProseMirror ul li p {
    line-height: 15px !important;
}

.textView {
    width: 100%;
    position: relative !important;
}

/* 纯文本编辑器 */
.textView .editor-textarea {
    width: 100%;
    box-shadow: inset 0 0 2px #c5c5c5;
    margin-bottom: 3rem !important;

    overflow-y: hidden;
    resize: none;
    width: var(100% - 2px);
    min-height: 800px !important;
    background-color: var(--vp-c-bg);
    padding: 0.5rem 1rem;
    line-height: 28px;
    font-family: var(--vp-font-family-base);
    font-size: 16px;
}



/*copy按钮*/
.textView .copy-box {
    opacity: 0;
    transition: all ease 0.5s;
    position: absolute;
    right: 13px;
    top: 40px;
    width: 34px;
    height: 34px;
    padding: 6px;
    border: 1px solid #dadde1;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
    z-index: 20;
    user-select: none;
}

.textView .copy-box:hover {
    border: 1px solid #444;
}

@media (max-width: 992px) {
    .textView .copy-box {
        opacity: 1;
    }
}

.textView .copy-box img {
    width: 100%;
    height: 100%;
}


 .textView:hover .copy-box {
    opacity: 1;
}
</style>