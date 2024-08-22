<script setup>
import { onMounted, reactive, ref, computed, watch, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap/gsap-core';

const emit = defineEmits(['countrySvgId', 'zoomedOut']);
const defaultViewBox = {
    x: 0,
    y: 0,
    width: 1010,
    height: 665
};
const tooltip = reactive({
    text: '',
    top: 0,
    left: 0
});
const route = useRoute();
const mapImage = shallowRef('');
const zoomedCountry = ref('');
let zoomed = false;

const isCountryView = computed(() => {
  if (route.params.countryId) {
    //if countryId in route - RouterView display SelectionOutput.vue
    return true;
  }
  //RouterView display Map.vue
  return false;
});


//TODO figure out how to update, maybe just in onMounted check route?
//Color selected country 
watch(isCountryView, () => {
    zoomedCountry.value = route.params.countryId
    console.log('zoomed:',zoomedCountry)
})

async function loadMap(){
    //import svg as raw string to use in v-html tag
    let map = await import('../assets/svgs/map-image.svg?component');
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
    console.log(element)
    if (element.tagName == 'path') {
        const elId = element.getAttribute('id');
        const newVb = element.getBBox();
        if (newVb.width < 200) {
            newVb.width += 64
            newVb.x -= 32
        }
        if (newVb.width < defaultViewBox.width) {
            const vbString = `${newVb.x} ${newVb.y} ${newVb.width} ${newVb.height}`
            let tween = gsap.to('.worldMap', {duration: 0.7, attr: {viewBox: vbString}, ease: "power1.in"});
            tween.play();
            zoomed = true;
        } 
        emit('countrySvgId', elId);
    }
};

function zoomOut() {
    const vbString = `${defaultViewBox.x} ${defaultViewBox.y} ${defaultViewBox.width} ${defaultViewBox.height}`
    let tween = gsap.to('.worldMap', {duration: 0.7, attr: {viewBox: vbString}, ease: "power1.in"});
    tween.play();
    zoomed = false;
}

onMounted(()=>{
    loadMap();
})

</script>

<template>
    <!-- Handles display of Map SVG - defines click events and mousemove/hover events for tooltip reaction -->
    <button v-if="zoomed" @click="zoomOut">Zoom Out</button>
    <div class="map-image" @click="handleSvgClick" @mousemove="displayTip" v-if="mapImage"><mapImage></mapImage></div>
    <div v-else><p>Loading World Map Image...</p></div>

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
    color: var(--color-text);
    padding: 0.5rem;
    font-size: 1.25rem;
    font-weight: 500;
    white-space: nowrap;
}
button {
    position: absolute;
    z-index: 5;
    cursor: pointer;
    top: 1rem;
    left: 1rem;
    border: none;
    background-color: var(--color-tooltip-bg);
    color: var(--color-text);
    padding: 0.5rem;
    font-size: 1rem;
}
</style>