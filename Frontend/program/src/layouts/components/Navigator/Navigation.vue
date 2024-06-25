<template>
    <div>
        <div class="nav-box">
            <h5>主页</h5>
            <router-link :to="{ name: 'index', params: { username: 'erina' } }">
                <div class="item active">
                    <div class="nav-icon">
                        <box-icon name='diamond'
                            :color="true ? 'var(--component-icon-color-reverse)' : 'var(--component-icon-color-default)'"></box-icon>
                    </div>
                    <h5>仪表盘</h5>
                </div>
            </router-link>
            <router-link :to="{ name: 'about1', params: { username: 'erina' } }">
                <div class="item">
                    <div class="nav-icon">
                        <box-icon name='diamond'
                            :color="false ? 'var(--component-icon-color-reverse)' : 'var(--component-icon-color-default)'"></box-icon>
                    </div>
                    <h5>仪表盘</h5>
                </div>
            </router-link>
            <hr>
        </div>
        <div class="nav-box">
            <h5>我的</h5>
            <router-link :to="{ name: 'about1', params: { username: 'erina' } }">
                <div class="item">
                    <div class="nav-icon">
                        <box-icon name='diamond'
                            :color="false ? 'var(--component-icon-color-reverse)' : 'var(--component-icon-color-default)'"></box-icon>
                    </div>
                    <h5>个人中心</h5>
                </div>
            </router-link>
            <router-link :to="{ name: 'about2', params: { username: 'erina' } }">
                <div class="item">
                    <div class="nav-icon">
                        <box-icon name='diamond'
                            :color="false ? 'var(--component-icon-color-reverse)' : 'var(--component-icon-color-default)'"></box-icon>
                    </div>
                    <h5>仪表盘仪表盘仪表盘仪表盘</h5>
                </div>
            </router-link>
            <hr>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
</script>
<style scoped lang='scss'>
.nav-box {
    margin-bottom: 30px;

    h5 {
        margin: 1rem 0;
    }

    .item {
        display: flex;
        align-items: center;
        margin: 10px 0;
        cursor: pointer;
        padding: 10px 15px;
        border-radius: 10px;

        .nav-icon {
            margin-right: 1rem;
            width: 32px;
            height: 32px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, .12);
            border-radius: 6px;
            background-color: var(--component-icon-color-reverse);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        h5 {
            margin: 0;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
    }

    .item.active {
        background: #e7ebf686;

        .nav-icon {
            background-color: #0b7fe9;
        }
    }

    .item:hover {
        background: #E7EBF6;
    }


}
</style>
