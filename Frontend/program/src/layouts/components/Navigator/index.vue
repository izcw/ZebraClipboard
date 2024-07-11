<template>
    <div class="Aside-box component layout-padding-large">
        <router-link :to="{ name: 'index' }">
            <div class="logo">
                <LogoIndex></LogoIndex>
                斑马在线剪贴板管理系统
            </div>
        </router-link>
        <div>
            <Navigation></Navigation>
            <Advertisement></Advertisement>
            <div class="version">
                <el-badge value="new" class="item" type="warning" :offset="[10, 5]">
                    v1.0.0
                </el-badge>
            </div>
        </div>

    </div>
</template>
<script setup>
import Navigation from '@/layouts/components/Navigator/Navigation.vue';
import Advertisement from '@/layouts/components/Navigator/Advertisement.vue';
import LogoIndex from '@/components/Logo/index.vue';
</script>
<style scoped lang='scss'>
.Aside-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .logo {
        font-size: 14px;
        font-weight: bold;
        margin: 30px 0;
        padding-bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .version {
        text-align: center;
        margin: 60px 0;
        color: #666;
    }
}

/* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */
.Aside-box::-webkit-scrollbar {
    width: 5px;
    height: 16px;
    background-color: #fff;
}

/* 定义滚动条轨道 内阴影+圆角 */
.Aside-box::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #fff;
}

/* 定义滑块 内阴影+圆角 */
.Aside-box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff;
}

.Aside-box:hover::-webkit-scrollbar-thumb {
    background-color: #ccc !important;
}
</style>
