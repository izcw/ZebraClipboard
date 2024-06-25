<template>
    <div class="VisitorAnalysis-echarts" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import { useThemeStore } from '@/stores/theme'; // 假设你有一个 Pinia 的 theme store

const themeStore = useThemeStore();
let myChart;

const initChart = () => {
    // 基于准备好的dom，初始化echarts实例
    const chartDom = document.querySelectorAll('.VisitorAnalysis-echarts');
    chartDom.forEach((item) => {
        myChart = echarts.init(item, themeStore.isDarkTheme ? 'dark' : 'light');
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
                        { value: 580, name: '游客' },
                        { value: 1048, name: '已登录' }
                    ]
                }
            ]
        });
    })
};

// 在组件挂载后初始化图表
onMounted(() => {
    initChart();

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
</script>

<style scoped lang='scss'></style>