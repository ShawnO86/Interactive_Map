<script setup>
import { ref, reactive } from 'vue';
import MapImage from '../assets/map-image.svg?raw';

const tooltip_text = ref('');
const country_svg = ref('');
const scale = ref(1);

const tooltip_pos = reactive({
    top: 0,
    left: 0
});

function displayTip(event) {
    const element = event.target;
    if (element.tagName == 'path') {
        tooltip_text.value = element.getAttribute('name');
        tooltip_pos.top = event.clientY - 24;
        tooltip_pos.left = event.clientX;
    } else {
        tooltip_text.value = '';
    }
};

function handleSvgClick(event) {
    const element = event.target;
    if (element.tagName == 'path') {
        const bBox = element.getBBox();
        // Set zoomed SVG content and adjust viewBox
        country_svg.value = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bBox.x} ${bBox.y} ${bBox.width} ${bBox.height}" class='zoomed-in'>${element.outerHTML}</svg>`;
    }
};

function backout() {
        // Reset back to full map
        country_svg.value = '';
};


</script>

<template>
    <div class="map-container" @click="handleSvgClick" @mousemove="displayTip">
        <button v-if="country_svg" @click="backout">Back to map</button>
        <div class="svg-wrapper" :style="{transform: `scale(${scale})`}">
            <div class="zoomed-svg" v-if="country_svg" v-html="country_svg"></div>
            <div class="svg-image" v-else v-html="MapImage"></div>
        </div>
    </div>

    <div class="tooltip" v-if="tooltip_text" 
        :style="{ top: tooltip_pos.top + 'px', left: tooltip_pos.left + 'px' }">
        {{ tooltip_text }}
    </div>
</template>

<style scoped>
.map-container {
    width: 100%;
    height: 100%;
    padding: 1rem;
    border: 10px solid black;
}

.svg-wrapper {
  transform-origin: center center; /* Ensure the zoom happens from the center */
  display: block; /* Ensure the SVG scales properly */
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease; /* Smooth zoom effect */
}

.svg-image, .zoomed-svg {
    margin: auto;
    height: 100%;
}

.tooltip {
    position: absolute;
    z-index: 5;
    pointer-events: none;
    background-color: var(--color-background);
    color: var(--color-map-selected);
    padding: 0.25rem;
    font-weight: 700;
}
</style>