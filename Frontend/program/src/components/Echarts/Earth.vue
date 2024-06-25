<template>
    <div class="Earth-echarts" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl';
import { useThemeStore } from '@/stores/theme'; // 假设你有一个 Pinia 的 theme store

const themeStore = useThemeStore();
let myChart;

const initChart = () => {
    const chartDom = document.querySelector('.Earth-echarts');
    myChart = echarts.init(chartDom, themeStore.isDarkTheme ? 'dark' : 'light');

    const option = {
        globe: {
            baseTexture: 'data-gl/asset/world.topo.bathy.200401.jpg',
            heightTexture: 'data-gl/asset/bathymetry_bw_composite_4k.jpg',
            shading: 'realistic',
            realisticMaterial: {
                roughness: 0.2,
                metalness: 0,
                transparent: true, // 开启透明度
            },
            viewControl: {
                autoRotate: true,
                autoRotateSpeed: 5,
                autoRotateAfterStill: 10,
                damping: 0.8,
                zoomSensitivity: 0, // 禁用放大缩小
            },
            layers: [{
                type: 'blend',
                blendTo: 'emission',
                texture: 'data-gl/asset/world.topo.bathy.200401.jpg',
                shading: 'realistic',
            }],
        },
        series: [{
            type: 'scatter3D',
            coordinateSystem: 'globe',
            blendMode: 'source-over',
            symbolSize: 2, // 设置点的大小
            itemStyle: {
                color: '#989DB5', // 点的颜色
            },
            data: generateRandomPoints(200), // 生成随机的点数据
        }],
    };

    myChart.setOption(option);

    // 生成随机的地球表面点数据
    function generateRandomPoints(numPoints) {
        const points = [];
        for (let i = 0; i < numPoints; i++) {
            points.push([
                Math.random() * 360 - 180, // 经度范围 -180 到 180
                Math.random() * 180 - 90, // 纬度范围 -90 到 90
            ]);
        }
        return points;
    }
};

// 在组件挂载后初始化图表
onMounted(() => {
    initChart();

    // 监听主题变化
    watch(
        () => themeStore.isDarkTheme,
        () => {
            if (myChart) {
                myChart.dispose(); // 销毁之前的图表实例
                initChart(); // 重新初始化图表实例
            }
        }
    );
});
</script>

<style scoped lang='scss'></style>
