// 监听本地存储，获取和存储
import { onMounted, watch } from 'vue'

export const monitorstorage = (store) => {
    // 在组件挂载时加载本地存储的数据
    // onMounted(() => {
        store.getlocalStorages();
    // });

    // 监听数据变化并自动持久化到 localStorage
    watch(
        () => store.$state,
        () => {
            store.setlocalStorages();
        },
        { deep: true }
    );
}