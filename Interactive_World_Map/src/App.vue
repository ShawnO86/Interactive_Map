<script setup>
import MapView from './components/Map.vue';
import { useRouter, useRoute, RouterLink, RouterView } from 'vue-router';
import { computed, ref } from 'vue';

const router = useRouter();
const route = useRoute();

const countryName = ref('');
const countryId = ref('');


const isSelectionOutput = computed(() => {
  return route.params.countryName !== undefined;
});

function onCountryName(data) {
  countryName.value = data;
  console.log("name: ", data);
};

function onCountryId(data) {
  countryId.value = data;
  console.log("id: ", data);
};

</script>

<template>
  <section class="map">
    <MapView @countryName='onCountryName' @countryId='onCountryId'></MapView>
  </section>
  <section class="output" v-if="isSelectionOutput">
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
