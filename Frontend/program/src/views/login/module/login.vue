<template>
    <el-form  ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" status-icon>
        <el-form-item label="" prop="user">
            <p>用户名</p>
            <el-input v-model="ruleForm.user" size="large" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="" prop="passwd">
            <p>密码</p>
            <el-input v-model="ruleForm.passwd" size="large" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%;margin-top: 1rem;" size="large"
                @click="submitForm">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { apiGetAdmin } from '@/api/admin';
import { ElMessage } from 'element-plus'
import router from '@/router/index.js';
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore();


// 创建表单引用
const ruleFormRef = ref(null);

// 创建表单数据
const ruleForm = reactive({
    user: 'admin',
    passwd: '123456'
})

// 创建表单验证规则
const rules = reactive({
    user: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度应为3到20', trigger: 'blur' },
    ],
    passwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 20, message: '长度应为3到20', trigger: 'blur' },
    ],
})


// 登录
const submitForm = async () => {
    if (!ruleFormRef.value) return;
    await ruleFormRef.value.validate(async (valid, fields) => {
        if (valid) {
            // 请求数据对比账户密码是否正确
            try {
                const response = await apiGetAdmin();
                if (response.password == ruleForm.passwd && response.user == ruleForm.user) {
                    console.log("正确");
                    ElMessage({
                        message: '登录成功',
                        type: 'success',
                    })
                    tokenStore.sessionStoragesetItem(response.token);
                    router.replace('/index');
                } else {
                    ElMessage({
                        message: '账号或密码错误',
                        type: 'warning',
                    })
                }
            } catch (error) {
                ElMessage({
                    message: '接口获取不到数据',
                    type: 'warning',
                })
            }
        } else {
            console.log('提交错误！', fields);
        }
    });
}

const resetForm = () => {
    if (!ruleFormRef.value) return;
    ruleFormRef.value.resetFields();
}
</script>

<style scoped lang='scss'></style>
