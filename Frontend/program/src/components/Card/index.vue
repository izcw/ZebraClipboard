<template>
    <div class="component Card-box layout-padding-small layout-margin-bottom-large">
        <h5>
            <slot name="title"></slot>
        </h5>
        <br>
        <slot name="contentbox"></slot>
    </div>
</template>
<script setup>

</script>
<style scoped lang='scss'>
.Card-box {
    width: 100%;
    height: auto;
}
</style>
