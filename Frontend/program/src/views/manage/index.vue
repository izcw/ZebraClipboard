<template>
    <div class="component-page component layout-padding-large">
        <div>
            <el-input v-model="searchfor" style="width: 240px" placeholder="请输入搜索内容..." clearable />
            <br />
            <br />
            <br />
        </div>

        <el-table :data="filteredUserData" style="width: 100%">
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
                    <el-popconfirm title="确定要删除吗?" @confirm="deleteData(scope.row.id)">
                        <template #reference>
                            <el-button link type="danger" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                    <el-button link type="primary" size="small" @click="editData(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="centerDialogVisible" title="编辑" width="500" align-center fullscreen>
            <span>Open the dialog from the center from the screen</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="editDataSave">
                        保存
                    </el-button>
                </div>
            </template>
        </el-dialog><!-- 编辑模态框 -->
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { apiGetUser, apiDeleteUser } from '@/api/user';
import { apiGetLimitation } from '@/api/limitation';
import { formatTime } from '@/utils/formatTime.js';

const searchfor = ref('');

// 获取用户数据
const userData = ref([]);
const getFetchUser = async () => {
    try {
        const response = await apiGetUser();
        userData.value = response;
        console.log(userData.value);
    } catch (error) {
        console.error('获取不到数据:', error);
    }
};
getFetchUser();

// 获取套餐限制数据
const limitationData = ref([]);
const getFetchLimitation = async () => {
    try {
        const response = await apiGetLimitation();
        limitationData.value = response;
        console.log(limitationData.value);
    } catch (error) {
        console.error('获取不到数据:', error);
    }
};
getFetchLimitation();

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

// 过滤用户数据
const filteredUserData = computed(() => {
    if (searchfor.value) {
        return formattedUserData.value.filter(user =>
            user.id.toString().includes(searchfor.value)
        );
    } else {
        return formattedUserData.value;
    }
});

// 删除用户
const deleteData = async (id) => {
    try {
        const response = await apiDeleteUser({ id });
        console.log(response);
        // 更新用户数据
        getFetchUser();
    } catch (error) {
        console.error('删除数据失败:', error);
    }
};

// 编辑
const centerDialogVisible = ref(false)
const editData = (id) => {
    centerDialogVisible.value = true
}

const editDataSave = ()=>{
    centerDialogVisible.value = false
}

</script>

<style scoped lang='scss'></style>
