<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="" prop="user">
            <el-input v-model="ruleForm.user" size="large" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="" prop="passwd">
            <el-input v-model="ruleForm.passwd" size="large" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%;" size="large" @click="onSubmit">登录</el-button>
        </el-form-item>
    </el-form>
    
</template>
<script setup>
import { reactive, ref } from 'vue'


const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
    user: 'admin',
    passwd: ''
})

const rules = reactive({
    user: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    passwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
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
