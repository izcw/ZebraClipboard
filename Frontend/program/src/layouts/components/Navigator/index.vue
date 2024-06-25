<template>
    <div class="Aside-box component layout-padding-large">
        <router-link :to="{ name: 'index' }">
            <div class="logo">
                斑马在线剪贴板管理系统
            </div>
        </router-link>
        <hr>
        <Navigation></Navigation>
        <Advertisement></Advertisement>
        <div class="version">
            <el-badge value="new" class="item" type="warning" :offset="[10, 5]">
                v1.0.0
            </el-badge>
        </div>
    </div>
</template>
<script setup>
import Navigation from '@/layouts/components/Navigator/Navigation.vue';
import Advertisement from '@/layouts/components/Navigator/Advertisement.vue';
</script>
<style scoped lang='scss'>
.Aside-box {
    width: 100%;
    height: 100%;

    .logo {
        font-size: 14px;
        font-weight: bold;
        margin: 30px 0;
        padding-bottom: 30px;
    }

    .version {
        text-align: center;
        margin: 60px 0;
        color: #666;
    }
}
</style>
