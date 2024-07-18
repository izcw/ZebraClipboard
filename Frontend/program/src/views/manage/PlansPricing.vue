<template>
    <div class="component-page component layout-padding-large">
        <div>
            <el-input v-model="searchfor" style="width: 240px" placeholder="请输入搜索内容..." clearable />
            <el-button type="primary">搜索</el-button>
            <br />
            <br />
            <br />
        </div>

        <el-table :data="limitationData" style="width: 100%">
            <el-table-column fixed="left" type="index" width="50" />
            <el-table-column fixed="left" prop="Name" label="套餐名称" width="100" />
            <el-table-column prop="Numberofclipboards" label="剪贴板数量" width="140" />
            <el-table-column prop="FileSize" label="附件空间" width="140" />
            <el-table-column prop="NumberoFwords" label="单个剪贴板最大字数" width="230" />
            <el-table-column prop="Maximumrecyclingtime" label="最大回收时间" width="230" />
            <el-table-column prop="CustomDomainName" label="支持只定义域名" width="230" />
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
import { apiGetLimitation } from '@/api/limitation';

// 获取套餐限制数据
let limitationData = ref([]);
const getGetLimitation = async () => {
    try {
        const response = await apiGetLimitation();
        limitationData.value = response;
        console.log(limitationData.value);
    } catch (error) {
        console.error('获取不到数据:', error);
    }
};
getGetLimitation();

</script>


<style scoped lang='scss'></style>