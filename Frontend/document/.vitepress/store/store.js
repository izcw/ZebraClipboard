// store.js
import { createPinia, defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      counter: 0
    }
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})

const pinia = createPinia()
export default pinia
