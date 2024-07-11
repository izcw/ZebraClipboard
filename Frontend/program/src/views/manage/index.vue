<template>
    <div class="component layout-padding-large">
        <el-input v-model="searchfor" style="width: 240px" placeholder="请输入搜索内容..." clearable /> <el-button
            type="primary">搜索</el-button>
        <br>
        <br>
        <br>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="name" label="ID" width="200" />
            <el-table-column prop="role" label="角色" width="100">
                <template #default="scope">
                    <el-tag v-if="scope.row.role == '已注册'" type="success">{{ scope.row.role }}</el-tag>
                    <el-tag v-else type="warning">{{ scope.row.role }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="ip" label="ip地址" width="200" />
            <el-table-column prop="active" label="活跃次数" width="140" />
            <el-table-column prop="share" label="分享总数" width="140" />
            <el-table-column prop="space" label="使用空间" width="140" />
            <el-table-column prop="space" label="总空间" width="140" />
            <el-table-column prop="logon" label="登录时间" width="160" />
            <el-table-column prop="create" label="账号创建时间" width="160" />
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default>
                    <el-button link type="danger" size="small" @click="handleClick">
                        删除
                    </el-button>
                    <el-button link type="primary" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { ref } from "vue"

let searchfor = ref()
const handleClick = () => {
    console.log('click')
}

const tableData = [
    {
        name: 'sdrfg54654654',
        role: '已注册',
        ip: '189.57.99.3',
        active:'1',
        share:"3",
        space:"363",
        logon:'20240805',
        create:'20240805',
    },
    {
        name: 's2345d654654',
        role: '游客',
        ip: '179.45.45.6',
        active:'4',
        share:"3",
        space:"437",
        logon:'20240805',
        create:'20240805',
    },
    {
        name: '4543drf',
        role: '已注册',
        ip: '189.46.26.2',
        active:'54',
        share:"34",
        space:"23",
        logon:'20240805',
        create:'20240805',
    },
]
</script>
<style scoped lang='scss'></style>
