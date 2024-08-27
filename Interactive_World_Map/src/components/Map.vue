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
const tooltip = reactive({
    text: '',
    top: 0,
    left: 0
});
const mapImage = shallowRef('');

let zoomed = ref(false);

async function loadMap() {
    //import svg as component
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
            tooltip.top = top;
            tooltip.left = left - ttWidth;
        }
    } else {
        tooltip.text = '';
    }
};

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
            const vbString = `${newVb.x} ${newVb.y} ${newVb.width} ${newVb.height}`;
            let moveTween = gsap.to('.world-map', { delay: 0.2, duration: 0.2, attr: { viewBox: vbString }, ease: "power1.in" });
            moveTween.play();
        }
        zoomed.value = true;
        emit('countrySvgId', elId);
    }
};

function zoomOutFully() {
    toggleSelection()
    const vbString = `${defaultViewBox.x} ${defaultViewBox.y} ${defaultViewBox.width} ${defaultViewBox.height}`;
    let tween = gsap.to('.world-map', { duration: 0.2, attr: { viewBox: vbString }, ease: "power1.in" });
    tween.play();
    zoomed.value = false;
}

function toggleSelection(elem = '') {
    const mapElementPaths = document.querySelector('.world-map').childNodes;
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
}

onMounted(() => {
    loadMap();
});

</script>

<template>
    <!-- Handles display of Map SVG - defines click events and mousemove/hover events for tooltip reaction -->
    <RouterLink to="/" v-if="zoomed" @click="zoomOutFully" class="link-btn">World Map</RouterLink>

    <div class="map-controls-container" v-else>
        <p id="map-controls-head">Map Controls</p>
        <button class="map-control" id="zoom-in">+</button>
        <button class="map-control" id="zoom-out">-</button>
        <button class="map-control" id="pan-left"><</button>
        <button class="map-control" id="pan-right">></button>
    </div>

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
.map-controls-container {
    position: absolute;
    z-index: 5;
    top: 0.5rem;
    left: 0.5rem;
    display: grid;
    gap: 0.25rem;
    grid-template-areas:
        "head head head"
        ". z-in ."
        "p-left . p-right"
        ". z-out .";
    background-color: var(--color-sidebar-bg);
    color: var(--color-text);
    padding: 1rem;
    border-radius: 0.5rem;
}

#map-controls-head {
    grid-area: head;
    padding-bottom: 1rem;
}

#zoom-in {
    grid-area: z-in;
}

#zoom-out {
    grid-area: z-out;
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

.link-btn {
    position: absolute;
    z-index: 5;
    top: 1rem;
    left: 1rem;
}
</style>