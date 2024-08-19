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
  <div class="zoomed-svg">

  </div>
</template>

<style scoped>
.zoomed-svg {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>

