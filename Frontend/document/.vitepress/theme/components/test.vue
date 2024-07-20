<!-- <template>
  <div>
    <h1>Counter: {{ counter }}</h1>
    <button @click="increment">点击+++++</button>
  </div>
</template>

<script setup>
import { ref} from 'vue';
import { storeToRefs } from 'pinia';
import { piniaStore } from '../../store/store.js';
import { monitorstorage } from '../hooks/monitorLocalstorage.js';

const store = piniaStore();
monitorstorage(store);
const { counter, data } = storeToRefs(store);

const increment = () => {
  store.increment();
};

</script> -->
