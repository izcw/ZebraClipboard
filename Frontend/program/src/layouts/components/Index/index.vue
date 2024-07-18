<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <CardSmall>
                            <template #title>
                                我的信息
                            </template>
                            <template #contentbox>
                                <Advertisement></Advertisement>
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
                </el-row>
                <br>
                <CardIndex>
                    <template #title>
                        实时信息
                    </template>
                    <template #more>
                        <router-link :to="{ name: 'chatRealinfo' }">more+</router-link>
                    </template>
                    <template #contentbox>
                        <ul v-infinite-scroll="load" infinite-scroll-immediate class="infinite-list" style="overflow: auto">
                            <li v-for="(item, index) in historinfoDataChange" :key="index" class="infinite-list-item"
                                :class="item.type">
                                <router-link :to="'/chat/realinfo?id=' + item.id" v-if="item.identity == 'chat'"
                                    class="content">
                                    <div class="picture">
                                        <el-avatar size="small"
                                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                                        <p>&emsp;{{ item.user }}</p>
                                    </div>

                                    <div class="notice">
                                        <p>发送：{{ item.content }}</p>
                                    </div>
                                </router-link>
                                <p v-else>{{ item.content }}</p>
                            </li>

                        </ul>
                    </template>
                </CardIndex>
            </el-col>
            <el-col :span="12">
                <div class="Occupying-box component layout-margin-bottom-large">
                    <el-carousel height="320px">
                        <el-carousel-item v-for="item in 2" :key="item">
                            <img v-if="item == 1"
                                src="https://picserver.duoyu.link/picfile/image/202306/07-1686098627954.png" alt="">
                            <img v-else src="https://picserver.duoyu.link/picfile/image/202407/18-1721237669960.jpg"
                                alt="">
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
import { ref, computed, watch,onMounted } from 'vue';
import CardIndex from "@/components/Card/index.vue";
import CardSmall from "@/components/Card/CardSmall.vue";
import EchartsVisitorAnalysis from "@/components/Echarts/VisitorAnalysis.vue";
import EchartsUsage from "@/components/Echarts/Usage.vue";
import Advertisement from '@/layouts/components/Navigator/Advertisement.vue';

import { useWebSocket } from '@/hooks/useWebSocket';


const { message, connectionStatus, historinfoData } = useWebSocket();

const historinfoDataChange = ref(false);
let slice = ref(5)
watch(() => historinfoData.value.length, (newLength, oldLength) => {
    slicedata()
});

let slicedata = () => {
    historinfoDataChange.value = historinfoData.value.slice(0, slice.value)
}

onMounted(() => {
    slicedata()
})

const load = () => {
    slice.value += 2
    slicedata()
}
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




.infinite-list {
    padding: 0;
    margin: 0;
    height: 300px;
    margin-bottom: 1rem;
    list-style: none;
    box-shadow: inset 0 0 4px #ccc;

    .infinite-list-item {
        background: var(--el-color-primary-light-9);
        margin: 10px;
        padding: 0.5rem 1rem;
        color: #606266;
        border-radius: 4px;
        font-size: 14px;
        line-height: 22px;
        word-wrap: break-word;
        word-break: normal;

        .content {
            display: flex;
            flex-direction: column;
            color: #606266;

            .picture {
                display: flex;
            }

            .notice {
                margin-left: 36px !important;
            }
        }
    }
}

.infinite-list .infinite-list-item.success {
    background: #bce0a4;
    color: #606266;
}

.infinite-list .infinite-list-item.error {
    background: #f0b9b7;
    color: #606266;
}

.infinite-list .infinite-list-item.info {
    background: #c8c9cc;
    color: #606266;
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>