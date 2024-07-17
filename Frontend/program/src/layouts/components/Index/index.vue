<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <CardSmall>
                            <template #title>
                                组件title
                            </template>
                        </CardSmall>
                    </el-col>
                    <el-col :span="12">
                        <CardSmall>
                            <template #title>
                                组件title2
                            </template>
                        </CardSmall>
                    </el-col>
                    <el-col :span="12">
                        <CardSmall>
                            <template #title>
                                组件title3
                            </template>
                        </CardSmall>
                    </el-col>
                </el-row>
                <br>
                <CardIndex>
                    <template #title>
                        组件title2
                    </template>
                    <template #contentbox>
                    </template>
                </CardIndex>
                <CardIndex>
                    <template #title>
                        访客分析
                    </template>
                    <template #contentbox>
                        <EchartsUsage></EchartsUsage>
                    </template>
                </CardIndex>
            </el-col>
            <el-col :span="12">
                <div class="Occupying-box component layout-margin-bottom-large">
                    <el-carousel height="320px">
                        <el-carousel-item v-for="item in 2" :key="item">
                            <img v-if="item == 1" src="https://picserver.duoyu.link/picfile/image/202306/07-1686098627954.png" alt="">
                            <img v-else src="https://picserver.duoyu.link/picfile/image/202407/18-1721237669960.jpg" alt="">
                        </el-carousel-item>
                      </el-carousel>
                </div>
                <CardIndex>
                    <template #title>
                        访客分析
                    </template>
                    <template #contentbox>
                        <EchartsVisitorAnalysis></EchartsVisitorAnalysis>
                    </template>
                </CardIndex>
                <CardIndex>
                    <template #title>
                        访客分析
                    </template>
                    <template #contentbox>
                        <EchartsUsage></EchartsUsage>
                    </template>
                </CardIndex>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import CardIndex from "@/components/Card/index.vue";
import CardSmall from "@/components/Card/CardSmall.vue";
import EchartsVisitorAnalysis from "@/components/Echarts/VisitorAnalysis.vue";
import EchartsUsage from "@/components/Echarts/Usage.vue";

</script>

<style scoped lang='scss'>
/* 占位盒子 */
.Occupying-box {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
}
</style>