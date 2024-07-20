<template>
    <div>
        <el-row justify="space-between" class="layout-margin-bottom-large">
            <el-col :xs="24" :sm="12" style="display: flex;align-items: center;">
                <h3>
                    <slot name="title"></slot>
                </h3>
            </el-col>
            <el-col :xs="24" :sm="12" style="display: flex;justify-content: flex-end;align-items: center;">
                <div>
                    <box-icon :name='themeStore.isDarkTheme == true ? "sun" : "moon"' class="boxicons-custom"
                        color="var(--component-icon-color)" size="22px" @click="themeStore.toggleTheme"></box-icon>
                </div>
                <box-icon name='cog' class="boxicons-custom" color="var(--component-icon-color)" size="22px"
                    @click="drawer = true"></box-icon>
                <el-avatar class="boxicons-custom" @click="gohomes" :size="35" :src="toximg" />
            </el-col>
        </el-row>
        <el-drawer v-model="drawer" direction="rtl" title="设置">
            <el-button @click="Logout">退出登录</el-button>
        </el-drawer>
    </div>

</template>
<script setup>
import { ref } from 'vue';
import tox from '@/assets/image/tou.png'
import router from '@/router/index.js';
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
const toximg = ref(tox)

const drawer = ref(false)


// 退出登录
let Logout = () => {
    sessionStorage.removeItem("token")
    router.replace('/login');
}

let gohomes = () => {
    router.replace('/about1');
}

</script>
<style scoped lang='scss'></style>
