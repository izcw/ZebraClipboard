<template>
    <div>
        <h1>pinia</h1>
      <p>Counter: {{ counter }}</p>
      <button @click="increment">Increment</button>
    </div>
  </template>
  
  <script setup>
  import { useMainStore } from '../../store/store.js'
  
  const store = useMainStore()
  const { counter, increment } = store

  console.log("pinia"+store);
  </script>
  