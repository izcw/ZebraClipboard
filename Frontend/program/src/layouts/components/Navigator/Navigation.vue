<template>
    <div>
        <div class="nav-box" v-for="(item, index) in RouteData" :key="index">
            <div v-if="item.menuStatus != false">
                <hr>
                <h5>{{ item.meta.title }}</h5>
                <router-link v-for="(item2, index2) in item.children" :key="index2" :to="{ name: item2.name }">
                    <div class="item" :class="{ active: route.name == item2.name }"  v-if="item2.menuStatus != false">
                        <div class="nav-icon">
                            <box-icon :name="item2.meta.icon"
                                :color="route.name == item2.name ? 'var(--component-icon-color-reverse)' : 'var(--component-icon-color-default)'"></box-icon>
                        </div>
                        <h5>{{ item2.meta.title }}</h5>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import 'boxicons';

const router = useRouter();
const route = useRoute();

let RouteData = router.options.routes;
let RouteCurrent = route;

console.log(RouteData, "8888");
console.log(RouteCurrent, "当前", route.path);
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