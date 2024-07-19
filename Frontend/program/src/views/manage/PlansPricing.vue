<template>
    <div class="component-page component layout-padding-large">
        <div>
            <el-input v-model="searchfor" style="width: 240px" placeholder="请输入搜索内容..." clearable />
            <br />
            <br />
            <el-button type="primary" @click="addData">添加套餐</el-button>
            <br />
            <br />
            <br />
        </div>

        <el-table :data="filterlimitationData" style="width: 100%">
            <el-table-column fixed="left" type="index" width="50" />
            <el-table-column fixed="left" prop="Name" label="套餐名称" width="100" />
            <el-table-column prop="Numberofclipboards" label="剪贴板最大数量" width="140" />
            <el-table-column prop="FileSize" label="附件空间" width="140">
                <template #default="scope">
                    <el-tag type="info"> {{ scope.row.FileSize }}&ensp;kb</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="NumberoFwords" label="单个剪贴板最大字数" width="230" />
            <el-table-column prop="Maximumrecyclingtime" label="最大回收时间" width="230" />
            <el-table-column prop="CustomDomainName" label="支持自定义域名" width="230">
                <template #default="scope">
                    <el-switch v-model="scope.row.CustomDomainName"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" disabled />
                </template>
            </el-table-column>
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

        <el-dialog v-model="centerDialogVisible" :title="addoredit == '1' ? '编辑' : '添加'" width="500" align-center
            fullscreen>
            <div style="padding:1rem;">
                <el-form :model="formdata" label-width="auto" style="width: 100%;">
                    <el-form-item label="套餐名称">
                        <el-input v-model="formdata.Name" prefix-icon="Coin" />
                    </el-form-item>
                    <el-form-item label="剪贴板最大数量">
                        <el-input v-model="formdata.Numberofclipboards" prefix-icon="List" />
                    </el-form-item>
                    <el-form-item label="单个剪贴板最大字数">
                        <el-input v-model="formdata.NumberoFwords" prefix-icon="Tickets" />
                    </el-form-item>
                    <el-form-item label="附件空间">
                        <el-select v-model="formdata.FileSize" placeholder="请选择附件空间">
                            <el-option label="100M" value="102400" />
                            <el-option label="500M" value="512000" />
                            <el-option label="1G" value="1048576" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="最大回收时间">
                        <el-select v-model="formdata.Maximumrecyclingtime" placeholder="请选择套餐类型">
                            <el-option label="10天" value="864000" />
                            <el-option label="30天" value="2592000" />
                            <el-option label="3个月" value="7776000" />
                            <el-option label="1年" value="31536000" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支持自定义域名">
                        <el-switch v-model="formdata.CustomDomainName" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" v-if="addoredit == '1'" @click="editDataSave">保存</el-button>
                    <el-button type="primary" v-else @click="addDataSave">添加</el-button>
                </div>
            </template>
        </el-dialog><!-- 编辑模态框 -->
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus'
import { generateUUId } from '@/utils/uuid.js'
import { apiGetLimitation, apiDeleteLimitation, apiSaveLimitation, apiAddLimitation } from '@/api/limitation';

const centerDialogVisible = ref(false)
const addoredit = ref("1")

let formdata = ref({
    id: "",
    Name: "",
    Numberofclipboards: "",
    FileSize: "",
    NumberoFwords: "",
    Maximumrecyclingtime: "",
    CustomDomainName: false
})

// 重置表单数据的函数
const resetFormData = () => {
    formdata.value = {
        id: "",
        Name: "",
        Numberofclipboards: "",
        FileSize: "",
        NumberoFwords: "",
        Maximumrecyclingtime: "",
        CustomDomainName: false
    };
};

// 获取套餐限制数据
let limitationData = ref([]);
const getGetDta = async () => {
    try {
        const response = await apiGetLimitation();
        limitationData.value = response;
        console.log(limitationData.value);
    } catch (error) {
        ElMessage.error('获取数据失败.')
        console.error('获取数据失败:', error);
    }
};
getGetDta();

// 过滤数据
const searchfor = ref('');
const filterlimitationData = computed(() => {
    if (searchfor.value) {
        const searchString = searchfor.value.toLowerCase();
        return limitationData.value.filter(user =>
            user.Name.toString().toLowerCase().includes(searchString)
        );
    } else {
        return limitationData.value;
    }
});

// 增加
let addData = () => {
    addoredit.value = '2'
    resetFormData();
    centerDialogVisible.value = true
}

let addDataSave = async () => {
    formdata.value.id = generateUUId()
    try {
        await apiAddLimitation(formdata.value);
        centerDialogVisible.value = false
        getGetDta();
        ElMessage({
            message: '添加成功.',
            type: 'success',
        })
    } catch (error) {
        ElMessage.error('添加失败.')
        console.error('添加失败:', error);
    }
}

// 删除
const deleteData = async (id) => {
    try {
        await apiDeleteLimitation({ id });
        // 更新数据
        getGetDta();
        ElMessage({
            message: '删除成功.',
            type: 'success',
        })
    } catch (error) {
        ElMessage.error('删除失败.')
        console.error('删除失败:', error);
    }
};

// 编辑
const editData = (id) => {
    addoredit.value = '1'
    centerDialogVisible.value = true
    formdata.value = limitationData.value.filter(item => item.id == id)[0];
    console.log(formdata.value);
}

const editDataSave = async () => {
    try {
        await apiSaveLimitation(formdata.value);
        centerDialogVisible.value = false
        getGetDta();
        ElMessage({
            message: '编辑成功.',
            type: 'success',
        })
    } catch (error) {
        ElMessage.error('编辑失败.')
        console.error('编辑失败:', error);
    }
}

</script>


<style scoped lang='scss'></style>