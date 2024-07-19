<template>
    <div class="layout-padding-small">
        <ToptoolIndex :title="title">
            <template #title>
                <el-page-header @back="goBack">
                    <template #content>
                        <span class="text-large font-600 mr-3"> {{ title }} </span>
                    </template>
                </el-page-header>
            </template>
        </ToptoolIndex>

        <RouterView />
        <FooterIndex></FooterIndex>
    </div>
</template>

<script setup>
import ToptoolIndex from '@/layouts/components/Toptool/index.vue';
import FooterIndex from '@/layouts/components/Footer/index.vue';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
    router.go(-1);
}

const props = defineProps({
    title: {
        type: String,
        default: '默认标题'
    }
});
</script>

<style scoped lang='scss'></style>