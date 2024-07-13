<template>
    <div class="boxquery">
        <el-input v-model="input2" size="large" style="width: 300px;line-height: 50px;" placeholder="使用剪切板ID查看内容"
            :prefix-icon="Search" />
        <el-button type="primary" size="large">查询剪贴板</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

</script>

<style scoped>
.boxquery {
    margin: 60px 0;

}
</style>