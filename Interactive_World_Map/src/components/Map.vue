<script setup>
import { ref, reactive } from 'vue';
import MapImage from '../assets/map-image.svg?raw';

const tooltip_text = ref('');
const country_svg = ref('');

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

//send this to a router for a new page, then use name to get more info from api.
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
        <div class="country-svg-wrapper" v-if="country_svg">
            <button @click="backout">Back to map</button>
            <div class="zoomed-svg" v-html="country_svg"></div>
        </div>
        <div class="map-svg-wrapper" v-else>
            <div class="svg-image" v-html="MapImage"></div>
        </div>
    </div>

    <div class="tooltip" v-if="tooltip_text" :style="{ top: tooltip_pos.top + 'px', left: tooltip_pos.left + 'px' }">
        {{ tooltip_text }}
    </div>
</template>

<style scoped>
.map-container {
    height: 100vh;
    width: 100%;
}

.map-svg-wrapper {
    height: 100%;
}

.country-svg-wrapper {
    height: 95%;
    padding: 1.5rem;
}

.svg-image {
    height: 100%;
    position: relative;
}
.zoomed-svg {
    height: 100%;
    position: relative;
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