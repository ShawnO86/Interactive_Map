<script setup>
//prop sent through route url (/country/countryId)
const props = defineProps({
  countryId: {
    type: String,
    required: true
  }
});

</script>

<template>
  <RouterLink to="/">Back To Map</RouterLink>
  <div class="map-image">
    {{ $route.params.countryId }}
  </div>
</template>

<style scoped>
</style>

