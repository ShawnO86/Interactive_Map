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
  let svg = await import(`../assets/svgs/${countryId}.vue?component`);
  countrySvg.value = svg.default;
}

onMounted(() => {
  getSvg(props.countryId);
})

</script>

<template>
  <RouterLink to="/">Back To Map</RouterLink>
  <div class="map-image">
    <countrySvg/>
  </div>
</template>

<style scoped>
</style>

