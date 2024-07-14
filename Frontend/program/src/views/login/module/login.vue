<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="" prop="user">
            <p>用户名</p>
            <el-input v-model="ruleForm.user" size="large" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="" prop="passwd">
            <p>密码</p>
            <el-input v-model="ruleForm.passwd" size="large" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%;margin-top: 1rem;" size="large" @click="loginSubmit">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { reactive, ref } from 'vue'
import router from '@/router/index.js';

let loginSubmit = ()=>{
    console.log(23);
    router.replace('/index');
}


const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
    user: 'admin',
    passwd: '123456'
})

const rules = reactive({
    user: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 6, max: 20, message: '长度应为6到20', trigger: 'blur' },
    ],
    passwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度应为6到20', trigger: 'blur' },
    ],
})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>
<style scoped lang='scss'></style>
