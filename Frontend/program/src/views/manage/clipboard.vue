<template>
    <div class="component-page component layout-padding-large">
        <div>
            <el-input v-model="searchfor" style="width: 240px" placeholder="请输入搜索内容..." clearable />
            <br />
            <br />
            <br />
        </div>

        <el-table :data="filterclipboardData" style="width: 100%">
            <el-table-column fixed="left" type="index" width="50" />
            <el-table-column fixed="left" prop="id" label="ID" width="100" />
            <el-table-column prop="userName" label="用户" width="140" />
            <el-table-column prop="" label="附件" width="140" />
            <el-table-column prop="" label="大小" width="140" />
            <el-table-column prop="data" label="文件" width="300">
                <template #default="scope">
                    <el-space wrap><el-tag v-for="item in scope.row.data" :key="item.label" type="info"
                            effect="plain">{{ item.name }}</el-tag></el-space>
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
                    <el-form-item label="用户">
                        <el-input v-model="formdata.userName" prefix-icon="Coin" />
                    </el-form-item>
                    <el-form-item v-for="(item, index) in formdata.data" :key="index" :label="item.name">
                        <EditorTextarea v-if="item.editorType == 'text'"></EditorTextarea>
                        <EditorTiptap v-else></EditorTiptap>
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
import EditorTiptap from '@/components/Editor/Tiptap.vue'
import EditorTextarea from '@/components/Editor/Textarea.vue'
import { apiGetClipboard, apiDeleteClipboard, apiSaveClipboard } from '@/api/clipboard';

const centerDialogVisible = ref(false)
const addoredit = ref("1")

let formdata = ref({
    id: "",
    userName: "",
    data: []
})


// 获取剪贴板数据
let clipboardData = ref([]);
const getGetDta = async () => {
    try {
        const response = await apiGetClipboard();
        clipboardData.value = response;
        // console.log(clipboardData.value);
    } catch (error) {
        console.error('获取不到数据:', error);
    }
};
getGetDta();


// 过滤数据
const searchfor = ref('');
const filterclipboardData = computed(() => {
    if (searchfor.value) {
        const searchString = searchfor.value.toLowerCase();
        return clipboardData.value.filter(user =>
            user.userName.toString().toLowerCase().includes(searchString)
        );
    } else {
        return clipboardData.value;
    }
});



// 删除
const deleteData = async (id) => {
    try {
        await apiDeleteClipboard({ id });
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
    formdata.value = clipboardData.value.filter(item => item.id == id)[0];
    console.log(formdata.value);
}

const editDataSave = async () => {
    try {
        await apiSaveClipboard(formdata.value);
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