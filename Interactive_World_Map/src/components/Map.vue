<script setup>
import { onMounted, reactive, ref, shallowRef } from 'vue';
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
const mapImage = shallowRef('');

let zoomed = ref(false);
let mapElement = ref('');

async function loadMap() {
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
    //console.log(element)
    if (element.tagName == 'path') {
        const elId = element.getAttribute('id');
        const newVb = element.getBBox();
        removeSelection(element)
        element.classList.add('selected')
        console.log("before:", newVb.width)
        if (newVb.width < 500) {
            newVb.width += 80
            newVb.x -= 40
        }
        console.log("after:", newVb.width)
        if (newVb.width < defaultViewBox.width) {
            const vbString = `${newVb.x} ${newVb.y} ${newVb.width} ${newVb.height}`
            let moveTween = gsap.to('.world-map', { delay: 0.2, duration: 0.2, attr: { viewBox: vbString }, ease: "power1.in" });
            moveTween.play();
        }
        zoomed.value = true;
        emit('countrySvgId', elId);
    }
};

function zoomOut() {
    removeSelection()
    const vbString = `${defaultViewBox.x} ${defaultViewBox.y} ${defaultViewBox.width} ${defaultViewBox.height}`
    let tween = gsap.to('.world-map', { duration: 0.2, attr: { viewBox: vbString }, ease: "power1.in" });
    tween.play();
    zoomed.value = false;
}

function removeSelection(elem = '') {
    const mapElement = document.querySelector('.world-map')
    mapElement.childNodes.forEach(node => {
        node.classList.remove('selected')
        if (elem) {
            if (node != elem) {
                node.classList.add('invis')
            }
        } else {
            setTimeout(() => {
                node.classList.remove('invis')
            }, 200)
        }
    });
}

onMounted(() => {
    loadMap();
})

</script>

<template>
    <!-- Handles display of Map SVG - defines click events and mousemove/hover events for tooltip reaction -->
    <RouterLink to="/" v-if="zoomed" @click="zoomOut" class="link-btn">World Map</RouterLink>

    <div class="map-image" @click="handleSvgClick" @mousemove="displayTip" v-if="mapImage">
        <mapImage></mapImage>
    </div>
    <div v-else>
        <p>Loading World Map Image...</p>
    </div>

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

.link-btn {
    position: absolute;
    z-index: 5;
    top: 1rem;
    left: 1rem;
}
</style>