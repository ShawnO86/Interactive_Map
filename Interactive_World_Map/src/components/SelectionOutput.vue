<script setup>
import { onMounted, ref } from 'vue';

//prop sent through route url (/country/countryId)
const props = defineProps({
  countryId: {
    type: String,
    required: true
  }
});

const countrySvg = ref('');

async function getSvg(countryId) {
  let svg = await import(`../assets/svg_countries/${countryId}.svg?raw`);
  countrySvg.value = svg.default;
}

onMounted(() => {
  getSvg(props.countryId);
})

</script>

<template>
  <RouterLink to="/">Back To Map</RouterLink>
  <div class="map-image" v-html="countrySvg">
  </div>
</template>

<style scoped>
</style>

