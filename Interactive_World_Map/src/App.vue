<script setup>
import Map from './components/Map.vue';
import Selection from './components/SelectionOutput.vue'
</script>

<template>
  
    <section class="map">
      <Map></Map>
    </section>

    <section>
      <Selection></Selection>
    </section>

</template>

<style scoped>
  .map {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
