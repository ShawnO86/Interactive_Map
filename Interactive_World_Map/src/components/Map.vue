<script setup>
import { onMounted, reactive, ref, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap/gsap-core';


const emit = defineEmits(['countrySvgId', 'zoomedOut']);
const defaultViewBox = {
    x: 0,
    y: 0,
    width: 1010,
    height: 665
};
const currentViewBox = { ...defaultViewBox };
const tooltip = reactive({
    text: '',
    top: 0,
    left: 0
});

const mapImage = shallowRef('');
const mapChanged = ref(false);
const countryView = ref(false);
const zoomAmt = ref(1)
const router = useRouter();
let mapElement;

async function loadMap() {
    //import svg as component
    let map = await import('../assets/svgs/map-image.svg?component');
    mapImage.value = map.default;
};

function setSelector() {
    mapElement = document.getElementById('world-map')
}

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
            tooltip.top = top;
            tooltip.left = left - ttWidth;
        }
    } else {
        tooltip.text = '';
    }
};

function updateViewBox(delayAmt) {
    const vbString = `${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.width} ${currentViewBox.height}`;
    let moveTween = gsap.to('#world-map', { delay: delayAmt, duration: 0.2, attr: { viewBox: vbString }, ease: "power1.in" });
    moveTween.play();
    if (currentViewBox.width != defaultViewBox.width || currentViewBox.x != defaultViewBox.x || currentViewBox.y != defaultViewBox.y) {
        mapChanged.value = true;
    } else {
        mapChanged.value = false;
    }
}

function handleSvgClick(event) {
    const element = event.target;
    if (element.tagName == 'path') {
        const elId = element.getAttribute('id');
        const newVb = element.getBBox();
        toggleSelection(element);
        element.classList.add('selected');
        //adds 80px to zoomed country final viewBox width
        if (newVb.width < 500) {
            newVb.width += 80
            newVb.x -= 40
        }
        if (newVb.width < defaultViewBox.width) {
            currentViewBox.width = newVb.width;
            currentViewBox.height = newVb.height
            currentViewBox.x = newVb.x;
            currentViewBox.y = newVb.y;
            updateViewBox(0.2);
        }
        emit('countrySvgId', elId);
    }
};

function zoomOutFully() {
    currentViewBox.x = defaultViewBox.x;
    currentViewBox.y = defaultViewBox.y;
    currentViewBox.width = defaultViewBox.width;
    currentViewBox.height = defaultViewBox.height;
    updateViewBox(0);
    router.push('/');
    zoomAmt.value = 1;
};

function toggleSelection(elem = '') {
    const mapElementPaths = mapElement.childNodes;
    mapElementPaths.forEach(node => {
        node.classList.remove('selected');
        if (elem && node != elem) {
            node.classList.add('invis');
        } else {
            setTimeout(() => {
                node.classList.remove('invis');
            }, 200);
        }
    });
};

function resetMap() {
    toggleSelection();
    zoomOutFully();
};

function zoomMap(dir) {
    let zoomFactor = 1;
    if (dir == 'in' && zoomAmt.value < 7) {
        zoomAmt.value += 1;
        zoomFactor = 0.7;
    } else if (dir == 'out' && zoomAmt.value > 1) {
        zoomAmt.value -= 1;
        zoomFactor = 1.3;
    } else if (dir == 'out' && zoomAmt.value == 1) {
        zoomOutFully();
    }
    const centerX = currentViewBox.x + currentViewBox.width / 2;
    const centerY = currentViewBox.y + currentViewBox.height / 2;
    currentViewBox.width *= zoomFactor;
    currentViewBox.height *= zoomFactor;
    currentViewBox.x = centerX - currentViewBox.width / 2;
    currentViewBox.y = centerY - currentViewBox.height / 2;
    updateViewBox(0);
};

function panMap(dir) {
    let panFactor = 1 / zoomAmt.value;
    switch (dir) {
        case "up":
            currentViewBox.y -= 150 * panFactor;
            break;
        case "down":
            currentViewBox.y += 150 * panFactor;
            break;
        case "left":
            currentViewBox.x -= 150 * panFactor;
            break;
        case "right":
            currentViewBox.x += 150 * panFactor;
            break;
    }
    updateViewBox(0);
};

onMounted(() => {
    loadMap();
});

</script>

<template>
    <!-- Handles display of Map SVG - defines click events and mousemove/hover events for tooltip reaction -->
    <div class="map-control-container">
        <div class="map-controls">
            <p id="map-controls-head">Map Controls</p>
            <button class="map-control-btn" id="pan-up" @click="panMap('up')">&uarr;</button>
            <button class="map-control-btn" id="pan-down" @click="panMap('down')">&darr;</button>
            <button class="map-control-btn" id="pan-left" @click="panMap('left')">&larr;</button>
            <button class="map-control-btn" id="pan-right" @click="panMap('right')">&rarr;</button>
            <div class="zoom-control-container">
                <button class="map-control-btn zoom-controls" id="zoom-in" @click="zoomMap('in')">+</button>
                <button class="map-control-btn zoom-controls" id="zoom-out" @click="zoomMap('out')">-</button>
            </div>
            <button class="map-control-btn back-to-map" v-if="mapChanged" @click="resetMap">Reset Map</button>
        </div>

    </div>
    <div class="map-image" @click="handleSvgClick" @mousemove="displayTip" v-if="mapImage">
        <mapImage @vue:mounted="setSelector"></mapImage>
    </div>

    <div v-else>
        <p>Loading World Map Image...</p>
    </div>

    <div class="tooltip" v-if="tooltip.text" :style="{ top: tooltip.top + 'px', left: tooltip.left + 'px' }">
        {{ tooltip.text }}
    </div>
</template>

<style scoped>
.map-control-container {
    position: absolute;
    z-index: 6;
    top: 0.5rem;
    left: 0.5rem;
    display: flex;
    flex-direction: column;
}

.map-controls {
    display: grid;
    grid-template-areas:
        "head head head"
        ". p-up ."
        "p-left . p-right"
        ". p-down ."
        "zoom zoom zoom"
        "back back back";
    grid-template-columns: repeat(3, 1fr);
    background-color: var(--color-sidebar-bg);
    color: var(--color-text);
    padding: 0.75rem;
    border-radius: 0.25rem;
}

.map-control-btn {
    border-radius: 0.25rem;
    padding: 0.25rem;
    border: 1px solid var(--color-text);
    cursor: pointer;
}

.map-control-btn:hover {
    background-color: var(--color-sidebar-bg);
    color: var(--color-text);
}

.map-control:active {
    background-color: var(--color-tooltip-bg);
}

#map-controls-head {
    grid-area: head;
    padding-bottom: 1rem;
    justify-self: center;
}

.zoom-control-container {
    grid-area: zoom;
    display: flex;
    padding-top: 0.5rem;
    gap: 0.25rem;
}

.zoom-controls {
    flex: 1;
}

#pan-up {
    grid-area: p-up;
}

#pan-down {
    grid-area: p-down;
}

#pan-left {
    grid-area: p-left;
}

#pan-right {
    grid-area: p-right;
}

.back-to-map {
    grid-area: back;
    margin-top: 1rem;
}

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
</style>