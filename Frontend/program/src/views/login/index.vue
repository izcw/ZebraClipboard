<template>
    <div class="login-layout">
        <!-- <div class="left">
            <el-image style="width: 100px; height: 100px" :src="er" fit="cover" />
            <div>
                <el-carousel trigger="click" height="150px" style="background-color: #fff;">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <el-image style="width: 100px; height: 100px" :src="url" fit="cover" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div> -->
        <div class="right">
            <div class="login-box">
                <div class="logo-loginbox">
                    <img :src="logo" alt="斑马在线剪贴板">
                    <span>斑马在线剪贴板</span>
                </div>
                <box-icon :name='themeStore.isDarkTheme == true ? "sun" : "moon"' class="boxicons-custom"
                    color="var(--component-icon-color)" size="22px" @click="themeStore.toggleTheme"></box-icon>
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="账户密码登录" name="first">
                        <div class="container">
                            <loginbox></loginbox>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="验证码登录" name="second">
                        <div class="container">
                            <registerbox></registerbox>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="login-footer">
                <FooterIndex></FooterIndex>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import loginbox from './module/login.vue'
import FooterIndex from '@/layouts/components/Footer/index.vue'
import registerbox from './module/register.vue'
import logoimg from '../../assets/image/logo.png'
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
const activeName = ref('first')
let logo = logoimg
const url =
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'

let handleClick = ()=>{
    
}
</script>
<style scoped lang='scss'>
.login-layout {
    width: 100%;
    height: 100vh;
    display: flex;
}

.left {
    width: 400px;
    height: 100%;
    background-color: #FDDD10;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.right {
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 200px;
        bottom: 0;
        left: 0;
        background-image: url(/src/assets/image/login.png);
        background-repeat: repeat-x;
        background-size: 100% 100%;
        background-position: 0 bottom;
        z-index: 0;
        pointer-events: none;
    }

    .login-box {
        z-index: 99 !important;
        padding: 50px;
        background-color: var(--component-background);
        border: 2px solid rgba(255, 255, 255, .3);
        border-radius: 10px;
        width: 500px;
        min-height: 300px;
        box-sizing: border-box;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        position: relative;

        .container {
            padding: 15px 0;
        }

        .boxicons-custom {
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
    }

    .login-footer {
        position: absolute;
        bottom: 0;
        z-index: 2;

        padding: 15px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}


.logo-loginbox {
    width: 100%;
    margin: 20px 0 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        font-size: 18px;
        font-weight: bold;
        margin-left: 1rem;
    }

    img {
        width: 60px;
        height: 60px;
    }
}



@media (max-width: 576px) {
    .login-box {
        width: 100% !important;
        height: 100% !important;
        display: flex;
        flex-direction: column;
        border: none !important;
    }

    .logo-loginbox {
        margin-bottom: 120px;
    }

}
</style>
