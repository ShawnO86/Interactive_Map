<script setup>
import { onMounted, reactive, ref, shallowRef } from 'vue';
import { gsap } from 'gsap/gsap-core';

//next add manual zoom and pan using viewBox and +- <> buttons

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
const zoomed = ref(false);
const countryView = ref(false);
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
}

function handleSvgClick(event) {
    const element = event.target;
    //console.log(element)
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
            updateViewBox(0.2)
        }
        zoomed.value = true;
        countryView.value = true;
        emit('countrySvgId', elId);
    }
};

function zoomOutFully() {
    toggleSelection()
    currentViewBox.x = defaultViewBox.x;
    currentViewBox.y = defaultViewBox.y;
    currentViewBox.width = defaultViewBox.width;
    currentViewBox.height = defaultViewBox.height;
    zoomed.value = false;
    countryView.value = false;
    updateViewBox(0)
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

function zoomMap(dir) {
    //map control - zoom
    const zoomFactor = dir == "in" ? 0.75 : 1.25;
    const centerX = currentViewBox.x + currentViewBox.width / 2;
    const centerY = currentViewBox.y + currentViewBox.height / 2;
    currentViewBox.width *= zoomFactor;
    currentViewBox.height *= zoomFactor;
    currentViewBox.x = centerX - currentViewBox.width / 2;
    currentViewBox.y = centerY - currentViewBox.height / 2;
    if (defaultViewBox.width != currentViewBox.width) {
        zoomed.value = true;
    } else {
        zoomed.value = false;
    }
    updateViewBox(0);

};

function panMap(dir) {
    //map control - pan
    switch (dir) {
        case "up":
            currentViewBox.y -= 25
            break;
        case "down":
            currentViewBox.y += 25
            break;
        case "left":
            currentViewBox.x -= 25
            break;
        case "right":
            currentViewBox.x += 25
            break;
    }
    updateViewBox(0)
};

onMounted(() => {
    loadMap();
});

</script>

<template>
    <!-- Handles display of Map SVG - defines click events and mousemove/hover events for tooltip reaction -->
    <div class="map-control-container">
        <div class="map-controls" v-if="!countryView">
            <p id="map-controls-head">Map Controls</p>
            <button class="map-control" id="pan-up" @click="panMap('up')">&uarr;</button>
            <button class="map-control" id="pan-down" @click="panMap('down')">&darr;</button>
            <button class="map-control" id="pan-left" @click="panMap('left')">&larr;</button>
            <button class="map-control" id="pan-right" @click="panMap('right')">&rarr;</button>
            <button class="map-control" id="zoom-in" @click="zoomMap('in')">+</button>
            <button class="map-control" id="zoom-out" @click="zoomMap('out')">-</button>
        </div>
        <button class="map-control" to="/" v-if="zoomed" @click="zoomOutFully">Default Map</button>
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
    z-index: 5;
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
        "z-in . z-out";
    grid-template-columns: repeat(3, 1fr);
    background-color: var(--color-sidebar-bg);
    color: var(--color-text);
    padding: 0.75rem;
    border-radius: 0.25rem;
}

.map-control {
    border-radius: 0.5rem;
    padding: 0.25rem;
    border: none;
    cursor: pointer;
}

.map-control:hover {
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

/* grid-area-name grid-row-start / grid-column-start / grid-row-end / grid-column-end */
#zoom-in {
    grid-area: z-in;
}

#zoom-out {
    grid-area: z-out;
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

.link-btn {}
</style>