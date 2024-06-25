<template>
    <div class="login-layout">
        <div class="left">
            <el-image style="width: 100px; height: 100px" :src="er" fit="cover" />
            <div>
                <el-carousel trigger="click" height="150px" style="background-color: #fff;">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <el-image style="width: 100px; height: 100px" :src="url" fit="cover" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="right">
            <div class="login-box">
                <el-image style="width: 50px; height: 50px" :src="er" fit="cover" />
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
                <div class="footer-inline">
                    <span>Copyright © 2024 izcw.</span>
                    <a href="https://beian.miit.gov.cn/"><span>xxxxxx号-2</span></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import loginbox from './module/login.vue'
import registerbox from './module/register.vue'
import sd from '../../assets/image/logo3.png'
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
const activeName = ref('first')
let er = sd
const url =
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
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
        padding: 50px;
        background-color: var(--component-background);
        border: 2px solid rgba(255, 255, 255, .3);
        border-radius: 10px;
        width: 500px;
        min-height: 300px;
        box-sizing: border-box;

        .container{
            padding: 15px 0;
        }
    }

    .login-footer {
        position: absolute;
        bottom: 0;
        z-index: 2;

        padding: 15px;
        color: #888;
        font-size: 14px;

        a {
            color: inherit;
            text-decoration: none;
        }
    }
}
</style>
