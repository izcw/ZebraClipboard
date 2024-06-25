<template>
    <div class="Usage-echarts" style="width: 100%; height: 200px;"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import { useThemeStore } from '@/stores/theme'; // 假设你有一个 Pinia 的 theme store

const themeStore = useThemeStore();
let myChart;
let xAxisData = [];
let data1 = [];
let data2 = [];
for (let i = 0; i < 100; i++) {
    xAxisData.push('A' + i);
    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}
const initChart = () => {
    // 基于准备好的dom，初始化echarts实例
    const chartDom = document.querySelectorAll('.Usage-echarts');
    chartDom.forEach((item) => {
        myChart = echarts.init(item, themeStore.isDarkTheme ? 'dark' : 'light');
        // 设置图表选项
        myChart.setOption({
            legend: {
                data: ['游客', '已登录']
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack']
                    },
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                splitLine: {
                    show: false
                }
            },
            yAxis: {},
            series: [
                {
                    name: '游客',
                    type: 'bar',
                    data: data1,
                    emphasis: {
                        focus: 'series'
                    },
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                },
                {
                    name: '已登录',
                    type: 'bar',
                    data: data2,
                    emphasis: {
                        focus: 'series'
                    },
                    animationDelay: function (idx) {
                        return idx * 10 + 100;
                    }
                }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
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