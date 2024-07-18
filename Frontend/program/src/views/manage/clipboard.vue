<template>
    <div class="component-page component layout-padding-large">
        <div>
            <el-input v-model="searchfor" style="width: 240px" placeholder="请输入搜索内容..." clearable />
            <el-button type="primary">搜索</el-button>
            <br />
            <br />
            <br />
        </div>

        <el-table :data="clipboardData" style="width: 100%">
            <el-table-column fixed="left" type="index" width="50" />
            <el-table-column fixed="left" prop="id" label="ID" width="100" />
            <el-table-column prop="userName" label="用户" width="140" />
            <el-table-column prop="" label="附件" width="140" />
            <el-table-column prop="" label="大小" width="140" />
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                    <el-button link type="danger" size="small" @click="handleClick(scope.row.id)">
                        删除
                    </el-button>
                    <el-button link type="primary" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { apiGetClipboard } from '@/api/clipboard';

// 获取套餐限制数据
let clipboardData = ref([]);
const getGetClipboard = async () => {
    try {
        const response = await apiGetClipboard();
        clipboardData.value = response;
        console.log(clipboardData.value);
    } catch (error) {
        console.error('获取不到数据:', error);
    }
};
getGetClipboard();

</script>


<style scoped lang='scss'></style>