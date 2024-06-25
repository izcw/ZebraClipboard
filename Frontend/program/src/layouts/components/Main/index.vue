<template>
    <div class="layout-padding-large">
        <ToptoolIndex :title="title">
            <template #title>
                {{ title }}
            </template>
        </ToptoolIndex>
        <RouterView />
    </div>
</template>

<script setup>
import ToptoolIndex from '@/layouts/components/Toptool/index.vue';
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '默认标题'
    }
});
</script>

<style scoped lang='scss'></style>