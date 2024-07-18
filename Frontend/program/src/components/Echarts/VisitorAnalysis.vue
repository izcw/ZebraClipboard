<template>
    <div class="VisitorAnalysis-echarts" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  import * as echarts from 'echarts';
  import { useThemeStore } from '@/stores/theme'; // 假设你有一个 Pinia 的 theme store
  import { apiGetUser } from '@/api/user';
  
  // 获取用户数据
  const userData = ref([]);
  let filterWechat = ref();
  let filterBrowserid = ref();
  
  const getFetchUser = async () => {
      try {
          const response = await apiGetUser();
          userData.value = response;
  
          filterWechat.value = userData.value.filter(item => item.wechat.user != '');
          filterBrowserid.value = userData.value.filter(item => item.wechat.user == '');
          initChart();
      } catch (error) {
          console.error('获取不到数据:', error);
      }
  };
  getFetchUser();
  
  const themeStore = useThemeStore();
  let myChart;
  
  const initChart = () => {
      // 基于准备好的dom，初始化echarts实例
      const chartDom = document.querySelector('.VisitorAnalysis-echarts');
      if (chartDom) {
          myChart = echarts.init(chartDom, themeStore.isDarkTheme ? 'dark' : 'light');
          // 设置图表选项
          myChart.setOption({
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                  top: '5%',
                  left: 'center'
              },
              series: [
                  {
                      name: 'Access From',
                      type: 'pie',
                      radius: ['40%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          label: {
                              show: true,
                              fontSize: 40,
                              fontWeight: 'bold'
                          }
                      },
                      labelLine: {
                          show: false
                      },
                      data: [
                          { value: filterBrowserid.value.length, name: '游客' },
                          { value: filterWechat.value.length, name: '已登录' }
                      ]
                  }
              ]
          });
      }
  };
  
  // 在组件挂载后初始化图表
  onMounted(() => {
      // 监听主题变化
      watch(
          () => themeStore.isDarkTheme,
          (newVal) => {
              if (myChart) {
                  myChart.dispose(); // 销毁之前的图表实例
                  initChart(); // 重新初始化图表实例
              }
          }
      );
  });
  
  // 在组件销毁前卸载图表实例
  onBeforeUnmount(() => {
      if (myChart) {
          myChart.dispose();
      }
  });
  </script>
  
  <style scoped lang='scss'></style>
  