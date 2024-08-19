<script setup>
import MapImage from '../assets/map-image.svg?raw';
import { reactive } from 'vue';

const emit = defineEmits(['countrySvgId']);

const tooltip = reactive({
    text: '',
    top: 0,
    left: 0
});

//display tooltip of country name while changing position with mouse cursor
function displayTip(event) {
    const element = event.target;
    if (element.tagName == 'path') {
        tooltip.text = element.getAttribute('name');
        tooltip.top = event.clientY - 24;
        tooltip.left = event.clientX;
    } else {
        tooltip.text = '';
    }
};

//emit the countrySvgId to App.vue to use with router to send to SelectionOutput.vue (/country/id)
function handleSvgClick(event) {
    const element = event.target;
    if (element.tagName == 'path') {
        emit('countrySvgId', element.getAttribute('id'));
    }
};

</script>

<template>
    <!-- Handles display of Map SVG - defines click events and mousemove/hover events for tooltip reaction -->
    <div class="map-image" @click="handleSvgClick" @mousemove="displayTip" v-html="MapImage"></div>

    <div class="tooltip" v-if="tooltip.text" :style="{ top: tooltip.top + 'px', left: tooltip.left + 'px' }">
        {{ tooltip.text }}
    </div>
</template>

<style scoped>
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