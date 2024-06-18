<template>
    <div class="home">
        <section class="hero">
            <div>
                <h1>{{ hero.name }}</h1>
                <p>{{ hero.text }}</p>
                <p>{{ hero.tagline }}</p>
                <div class="actions">
                    <a v-for="action in hero.actions" :key="action.link" :href="action.link" :class="action.theme">
                        {{ action.text }}
                    </a>
                </div>
            </div>
            <img :src="hero.image.src" :alt="hero.image.alt" />

        </section>
        <section class="features">
            <div v-for="feature in features" :key="feature.title" class="feature">
                <h2>{{ feature.title }}</h2>
                <p>{{ feature.details }}</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const hero = ref({
    name: '斑马在线剪贴板',
    text: '免费文本、图片临时分享',
    tagline: 'My great project tagline',
    image: {
        src: '/logo.png',
        alt: '水獭托管'
    },
    actions: [
        { theme: 'brand', text: '免登录免费使用', link: '/docs/start/introduction' },
        { theme: 'alt', text: '使用文档', link: '/docs/start/quick-start' }
    ]
});

const features = ref([
    { title: 'Feature A', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { title: 'Feature B', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { title: 'Feature C', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }
]);
</script>

<style scoped>
.home {
    text-align: center;
    padding: 2rem;
}

.hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.hero img {
    width: 150px;
    height: 150px;
}

.actions a {
    margin: 0 10px;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
}

.actions .brand {
    background-color: #42b983;
    color: #fff;
}

.actions .alt {
    background-color: #35495e;
    color: #fff;
}

.features {
    display: flex;
    justify-content: space-around;
    padding: 2rem 0;
}

.feature {
    max-width: 200px;
}
</style>