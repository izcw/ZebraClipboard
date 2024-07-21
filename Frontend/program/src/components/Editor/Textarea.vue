<template>
    <textarea class="EditorTextarea" v-model="props.data.data[0].content"></textarea>
</template>
<script setup>
import { inject, computed, defineProps, ref, watch } from 'vue';
const props = defineProps({
    data: {
    type: Object, // 确保这里是 String
    required: true
  }
});
</script>
<style lang='scss'>
.EditorTextarea {
    width: 100%;
    border: 1px solid #e2e2e3;
    box-shadow: rgb(197, 197, 197) 0px 0px 2px inset;
    outline: none;
    padding: 0.5rem 1rem;
    min-height: 400px !important;
}
</style>