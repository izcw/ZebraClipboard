<template>
  <div class="common-layout">
    <el-container>
      <div class="aside-box layout-padding-small">
        <NavigatorIndex></NavigatorIndex>
      </div>
      <el-main class="layout-padding-small">
        <MainIndex :title="pageTitle"></MainIndex>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import NavigatorIndex from './components/Navigator/index.vue';
import MainIndex from './components/Main/index.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// 使用 useRoute 钩子获取当前路由对象
const route = useRoute();

// 定义一个响应式变量来存储当前页面的标题
const pageTitle = ref('首页');

// 监听路由对象的变化，并根据 meta.title 更新 pageTitle
watch(
  () => route.meta.title,
  (newTitle) => {
    pageTitle.value = newTitle || '默认标题';
  },
  { immediate: true }
);
</script>

<style scoped lang='scss'>
.common-layout {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;

    .aside-box {
      width: 300px;
      height: 100%;
    }

    .el-main {
      width: 100%;
      height: 100%;
    }
  }
}
</style>