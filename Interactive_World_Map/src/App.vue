<script setup>
import MapImage from './assets/map-image.svg?raw';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const countrySvgId = ref('');

const routeRead = computed(() => {
  return router.currentRoute.value.fullPath;
});

function getId(id) {
  countrySvgId.value = id;
  router.push(`/country/${countrySvgId.value}`)
};

function backout() {
  // Reset back to full map
  //in selection_output will just route to root path.
  countrySvgId.value = '';
};

</script>

<template>

  <section class="cur-page">
    <div>route: {{ routeRead }}
      <RouterLink to="/" v-if="routeRead == `/country/${countrySvgId}`" @click="backout">World Map</RouterLink>
    </div>

    <RouterView v-if="routeRead == `/country/${countrySvgId}`" :countrySvgId="countrySvgId" />
    <RouterView v-else :MapImage="MapImage" @countrySvgId="getId" />
  </section>

</template>

<style scoped>
.cur-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
