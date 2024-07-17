<template>
    <div class="boxquery-box">
        <div>
            <el-input v-model="zebraquery" size="large" style="width: 300px;line-height: 50px;" clearable
                placeholder="使用剪切板ID查看内容" />
            <el-button type="primary" size="large" plain @click="getQuery">查询剪贴板</el-button>
        </div>
        <div v-if="!textStatus"></div>
        <div v-else>
            <!--<el-empty v-if="!textStatus && zebraquery != '' || zebraquery != null " description="没找到" /> -->
            <a href="/clipboard.html">
                <div class="result">
                    <p>
                        用户：{{ data.userName }} 分享的
                    </p>
                    <img src="/images/icon/textquery.png" alt="">
                </div>
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

let data = ref()
let textStatus = ref(false)
let zebraquery = ref()

let getQuery = async () => {
    textStatus.value = false
    if (zebraquery.value == '' || zebraquery.value == null) {
        ElMessage({
            message: '剪贴板ID不能为空',
            type: 'warning',
        })
        return
    }
    try {
        let response = await axios.get('http://localhost:3400/clipboard/' + zebraquery.value);
        console.log('获取成功:', response.data);
        data.value = response.data;
        textStatus.value = true
    } catch (error) {
        // console.error('获取数据时出错:', error);
        ElMessage({
            message: '没找到',
            type: 'warning',
        })
        return
    }
}


</script>

<style scoped>
a {
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

.result {
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

.result p {
    width: 100%;
    word-wrap: break-word;
    word-break: normal;
    font-size: 14px;
}

.result img {
    width: 80px;
    height: 80px;
    margin-top: 30px;
}

.result:hover {
    border: 2px solid var(--vp-c-divider);
    color: var(--vp-c-brand-1);
}
</style>