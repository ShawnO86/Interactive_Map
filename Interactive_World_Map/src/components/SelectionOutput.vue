<!-- SelectionOutput.vue -->
<script setup>
import { computed } from 'vue';

const props = defineProps({
    countrySvg: {
    type: Object,
    required: true
  }
});

const svgViewBox = computed(() => {
  const { x, y, width, height } = props.countrySvg;
  return `${x} ${y} ${width} ${height}`;
});

</script>

<template>
  <div class="zoomed-svg">
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBox" class="zoomed-in" v-html="props.countrySvg.html">
    </svg>
  </div>
</template>

<style scoped>
.zoomed-svg {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>

