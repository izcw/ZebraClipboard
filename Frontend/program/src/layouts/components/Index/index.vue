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
                <div class="Occupying-box  layout-padding-small layout-margin-bottom-large">
                    <EchartsEarth></EchartsEarth>
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
import EchartsEarth from "@/components/Echarts/Earth.vue";

</script>

<style scoped lang='scss'>
/* 占位盒子 */
.Occupying-box{
    width: 100%;
    height: 400px;
}
</style>