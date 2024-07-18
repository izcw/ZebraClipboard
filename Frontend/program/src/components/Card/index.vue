<template>
    <div class="component Card-box layout-padding-small layout-margin-bottom-large">
        <div class="head-title">
            <h5>
                <slot name="title"></slot>
            </h5>
            <div class="more">
                <slot name="more"></slot>
            </div>
        </div>

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
    overflow: hidden;

    .head-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
