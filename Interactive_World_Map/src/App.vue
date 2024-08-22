<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MapView from './components/Map.vue';

const router = useRouter();

//Gets emit from Map.vue to send to SelectionOutput.vue dynamically
function goToCountryPage(id) {
  router.push(`/country/${id}`);
};

onMounted(() => {
  console.log("hello????")
})

</script>

<template>
  <section class="map-container">
    <MapView @countrySvgId="goToCountryPage"></MapView>
  </section>

  <section class="cur-page">
    <RouterView></RouterView>
  </section>

</template>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.cur-page {
  width: 25vw;
  max-width: 30rem;
  padding: 1rem;
  background-color: var(--color-sidebar-bg);
}
</style>
