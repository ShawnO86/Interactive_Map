<script setup>
import { ref, reactive } from 'vue';
import MapImage from '../assets/map-image.svg?raw';
import SelectionOutput from './SelectionOutput.vue';

const tooltip_text = ref('');

const countrySvg = reactive({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    html: ''
});

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

//emit the country_svg to selection_output component and use router to get to it.
function handleSvgClick(event) {
    const element = event.target;
    if (element.tagName == 'path') {
        const bBox = element.getBBox();
        // Set zoomed SVG content and adjust viewBox
        countrySvg.x = bBox.x;
        countrySvg.y = bBox.y;
        countrySvg.width = bBox.width;
        countrySvg.height = bBox.height;
        countrySvg.html = element.outerHTML;
    }
};

function backout() {
    // Reset back to full map
    //in selection_output will just route to root path.
    countrySvg.x = 0;
    countrySvg.y = 0;
    countrySvg.width = 0;
    countrySvg.height = 0;
    countrySvg.html = "";
};

</script>

<template>
    <div class="map-container" @click="handleSvgClick" @mousemove="displayTip">
        <div class="country-svg-wrapper" v-if="countrySvg.html">
            <button @click="backout">Back to map</button>
            <SelectionOutput :countrySvg="countrySvg" />
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
    padding: 1rem;
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