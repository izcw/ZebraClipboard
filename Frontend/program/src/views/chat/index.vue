<template>
    <div class="component layout-padding-large">
        <div>
            <el-input v-model="searchfor" style="width: 240px" placeholder="请输入搜索内容..." clearable  disabled/>
            <br />
            <br />
            <br />
        </div>

        <el-table :data="historinfoDataChange" style="width: 100%">
            <el-table-column fixed="left" type="index" width="50" />
            <el-table-column fixed="left" prop="id" label="id" width="240" />
            <el-table-column prop="user" label="用户" width="200" />
            <el-table-column prop="content" label="信息内容" width="360">
                <template #default="scope">
                    <el-tag type="info" size="large">{{ scope.row.content }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="80" />
            <el-table-column prop="identity" label="身份" width="80" />
            <el-table-column prop="create" label="创建时间" width="230" sortable />
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                    <el-button link type="danger" size="small" @click="handleClick(scope.row.id)" disabled>
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paging">
            <el-pagination background layout="prev, pager, next" :page-size="pagesize" :current-page="currentpage"
                :total="historinfoData.length" pager-count="10" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch,onMounted } from 'vue';
import { useWebSocket } from '@/hooks/useWebSocket';

const { message, connectionStatus, historinfoData } = useWebSocket();

const historinfoDataChange = ref();
watch(() => historinfoData.value.length, (newLength, oldLength) => {
    slicedata()
});



// 分页
let pagesize = ref(10) // 每页个数
let currentpage = ref(1) // 当前页
let slicedata = () => {
    historinfoDataChange.value = historinfoData.value.slice((currentpage.value - 1) * pagesize.value, pagesize.value * currentpage.value)
}
onMounted(() => {
    slicedata()
})

const handleCurrentChange = (val) => { // 当前页改变时触发
    currentpage.value = val
    slicedata()
}
</script>


<style scoped lang='scss'></style>