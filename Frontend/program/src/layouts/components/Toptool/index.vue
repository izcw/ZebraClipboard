<template>
    <el-row justify="space-between layout-margin-bottom-large">
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
            <box-icon name='cog' class="boxicons-custom" color="var(--component-icon-color)" size="22px"></box-icon>
            <el-avatar class="boxicons-custom" :size="35" :src="toximg" />
        </el-col>
    </el-row>
</template>
<script setup>
import tox from '@/assets/image/tou.png'
import { ref } from 'vue';
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
const toximg = ref(tox)
</script>
<style scoped lang='scss'></style>
