<template>
    <div class="component layout-padding-large">
        <div>
            <el-input v-model="searchfor" style="width: 240px" placeholder="请输入搜索内容..." clearable />
            <el-button type="primary">搜索</el-button>
            <br />
            <br />
            <br />
        </div>

        <el-table :data="formattedUserData" style="width: 100%">
            <el-table-column fixed="left" type="index" width="50" />
            <el-table-column fixed="left" prop="id" label="ID" width="100" />
            <el-table-column prop="role" label="角色" width="100">
                <template #default="scope">
                    <el-tag v-if="scope.row.wechat.user != ''" type="success">已注册</el-tag>
                    <el-tag v-else type="warning">游客</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="ip" label="IP地址" width="200" />
            <el-table-column prop="VerifiCode" label="验证码" width="140" />
            <el-table-column prop="VerifiCodeTimeFormatted" label="验证码创建时间" width="230" />
            <el-table-column prop="limitationFindComputed.NumberoFwords" label="单个剪贴板最大字数" width="150" />
            <el-table-column label="附件空间" width="140">
                <template #default="scope">
                    <span v-if="scope.row.limitationFindComputed">
                        {{ scope.row.limitationFindComputed.FileSize }} / {{ scope.row.limitationFindComputed.FileSize
                        }}
                    </span>
                    <span v-else>数据缺失</span>
                </template>
            </el-table-column>
            <el-table-column prop="active" label="活跃次数" width="140" />
            <el-table-column prop="share" label="分享总数" width="140" />
            <el-table-column prop="logon" label="登录时间" width="160" />
            <el-table-column prop="createFormatted" label="账号创建时间" width="230" />
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
import { apiGetUser } from '@/api/user';
import { apiGetLimitation } from '@/api/limitation';
import { formatTime } from '@/utils/formatTime.js';

const searchfor = ref('');
const handleClick = (id) => {
    console.log('删除用户ID:', id);
};

// 获取用户数据
const userData = ref([]);
const getfetchUser = async () => {
    try {
        const response = await apiGetUser();
        userData.value = response;
        console.log(userData.value);
    } catch (error) {
        console.error('获取不到数据:', error);
    }
};
getfetchUser();

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

// 格式化用户数据
const formattedUserData = computed(() => {
    return userData.value.map(user => ({
        ...user,
        VerifiCodeTimeFormatted: formatTime(user.VerifiCodeTime, 'YYYY年MM月DD日 hh时mm分ss秒'),
        createFormatted: formatTime(user.create, 'YYYY年MM月DD日 hh时mm分ss秒'),
        limitationFindComputed: limitationFind(user.limitationID)
    }));
});

// 查找对应限制数据
const limitationFind = (id) => {
    const item = limitationData.value.find((item) => item.id == id);
    if (item) {
        return item;
    } else {
        return { FileSize: '未知', NumberoFwords: '未知' }; // 默认值避免错误
    }
};

</script>


<style scoped lang='scss'></style>