<script setup>
import { onMounted, shallowRef } from 'vue';

//prop sent through route url (/country/countryId)
const props = defineProps({
  countryId: {
    type: String,
    required: true
  }
});

const countrySvg = shallowRef('');

async function getSvg(countryId) {
  let svg = await import(`../assets/svgs/${countryId}.svg?raw`);
  countrySvg.value = svg.default;
}

onMounted(() => {
  getSvg(props.countryId);
})

</script>

<template>
  <RouterLink to="/">Back To Search</RouterLink>
  <div class="map-image" v-if="countrySvg" v-html="countrySvg"></div>
  <div v-else><p>Loading Country Data...</p></div>
</template>

<style scoped>
</style>

