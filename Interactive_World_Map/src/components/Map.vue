<script setup>
import { onMounted, reactive, ref, shallowRef } from 'vue';

const emit = defineEmits(['countrySvgId']);
const mapImage = shallowRef('');

const tooltip = reactive({
    text: '',
    top: 0,
    left: 0
});

async function loadMap(){
    //import svg as raw string to use in v-html tag
    console.log("load map?")
    let map = await import('../assets/map-image.vue');
    mapImage.value = map.default;
};

//display tooltip of country name while changing position with mouse cursor
function displayTip(event) {
    const element = event.target;
    const winWidth = window.innerWidth;
    const cursorPos = {
            y: event.clientY,
            x: event.clientX
        }

    const ttDiv = document.querySelector('.tooltip');
    let ttWidth = 0;

    if (element.tagName == 'path') {
        tooltip.text = element.getAttribute('name');
        let top = cursorPos.y - 50;
        let left = cursorPos.x;
        if (ttDiv) {
            if (winWidth / 2 < cursorPos.x) {
                ttWidth = ttDiv.offsetWidth;
            }
            if (top < 10) {
                top = 10;
            }
            tooltip.top = top
            tooltip.left = left - ttWidth
        }
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

onMounted(()=>{
    loadMap();
})

</script>

<template>
    <!-- Handles display of Map SVG - defines click events and mousemove/hover events for tooltip reaction -->
    <div class="map-image" @click="handleSvgClick" @mousemove="displayTip" v-if="mapImage">
        <mapImage></mapImage>
    </div>
    <div v-else>Loading World Map Image...</div>

    <div class="tooltip" v-if="tooltip.text" :style="{ top: tooltip.top + 'px', left: tooltip.left + 'px' }">
        {{ tooltip.text }}
    </div>
</template>

<style scoped>
.tooltip {
    position: absolute;
    z-index: 5;
    pointer-events: none;
    background-color: var(--color-tooltip-bg);
    color: var(--color-map-selected);
    padding: 0.5rem;
    font-size: 1.25rem;
    font-weight: 500;
    white-space: nowrap;
}
</style>