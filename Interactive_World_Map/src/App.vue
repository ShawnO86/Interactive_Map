<script setup>
<<<<<<< HEAD
import MapImage from './assets/map-image.svg?raw';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const countrySelection = reactive({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  name: '',
  html: ''
});

const routeRead = computed(() => {
  return router.currentRoute.value.fullPath;
});

function getSvg(countrySvg) {
  countrySelection.x = countrySvg.x;
  countrySelection.y = countrySvg.y;
  countrySelection.width = countrySvg.width;
  countrySelection.height = countrySvg.height;
  countrySelection.name = countrySvg.name;
  countrySelection.html = countrySvg.html;
  router.push('/country')
}

function backout() {
  // Reset back to full map
  //in selection_output will just route to root path.
  countrySelection.x = 0;
  countrySelection.y = 0;
  countrySelection.width = 0;
  countrySelection.height = 0;
  countrySelection.html = "";
=======
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
>>>>>>> ZoomAndPanTest
};

</script>

<template>
<<<<<<< HEAD

  <section class="cur-page">
    <div>route: {{ routeRead }}
      <RouterLink to="/" v-if="routeRead == '/country'">World Map</RouterLink>
    </div>

    <RouterView v-if="routeRead == '/country'" :countrySvg="countrySelection" />
    <RouterView v-else :MapImage="MapImage" @countrySvg="getSvg" />
  </section>

</template>

<style scoped>
.cur-page {
=======
  <section class="map">
    <MapView @countryName='onCountryName' @countryId='onCountryId'></MapView>
  </section>
  <section class="output" v-if="isSelectionOutput">
    <RouterView />
  </section>
</template>

<style scoped>
.map {
>>>>>>> ZoomAndPanTest
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
<<<<<<< HEAD
  flex-direction: column;
}
</style>
=======
}
</style>
>>>>>>> ZoomAndPanTest
