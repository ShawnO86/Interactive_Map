<!-- SelectionOutput.vue -->
<script setup>

const props = defineProps({
  countryId: {
    type: String,
    required: true
  }
});

</script>

<template>
  <RouterLink to="/">Back To Map</RouterLink>
  <div class="zoomed-svg">
    {{ $route.params.countryId }}
  </div>
</template>

<style scoped>
.zoomed-svg {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>

