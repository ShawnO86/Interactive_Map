<script setup>
import MapView from './components/Map.vue';

</script>

<template>
  <section class="map">
    <MapView></MapView>
  </section>
  <section class="output">
    <RouterView />
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
