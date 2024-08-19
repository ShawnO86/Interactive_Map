<script setup>
import { ref, reactive, watch } from 'vue';
import MapImage from '../assets/map-image.svg?raw';

const tooltip_text = ref('');
const country_svg = ref('');
const country_name = ref('');
const emit = defineEmits(['countryName', 'countryId'])


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
        country_name.value = element.getAttribute('name')
        // Set zoomed SVG content and adjust viewBox
        country_svg.value = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bBox.x} ${bBox.y} ${bBox.width} ${bBox.height}" class='zoomed-in'>${element.outerHTML}</svg>`;
        emit('countryName', country_name.value)
        emit('countryId', element.id)
    }
};

function backout() {
    // Reset back to full map
    //in selection_output will just route to root path.
    country_svg.value = '';
};


//figure out how to zoom while still being able to pan the svg around...
//what would SVG x and y be relative to client X and Y?
function zoom(event){
    const element = event.target;
    if (element.tagName == 'path') {
        const parent = element.parentElement;
        console.log(event)
        let [x, y, width, height] = parent.getAttribute('viewBox').split(' ');
        x = parseInt(x);
        y = parseInt(y);
        width = parseInt(width);
        height = parseInt(height);
        if (event.deltaY < 0) {
            width -= 50
            height -= 50
        } else {
            width += 50
            height += 50
        }

        console.log(x, y, width, height);
        parent.setAttribute('viewBox', `${x} ${y} ${width} ${height}`) 
    }

}

watch(country_svg, () => {
    if (country_svg) {
        tooltip_text.value = '';
    }
});

</script>

<template>
    <div class="map-container" >
        <div class="country-svg-wrapper" v-if="country_svg" >
            <div class="country-heading">
                <h1>{{ country_name }}</h1>
                <button @click="backout">World Map</button>
            </div>
            <div class="svg-image" v-html="country_svg"></div>
        </div>
        <div class="map-svg-wrapper" v-else @click="handleSvgClick" @mousemove="displayTip">
            <div class="svg-image" v-html="MapImage" @wheel="zoom"></div>
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
    display: flex;
    flex-direction: column;
    height: 95%;
}

.country-heading {
    display: flex;
    justify-content: space-between;
    background-color: var(--color-border-highlight);
    padding: 1rem;
}

.svg-image {
    height: 100%;
    position: relative;
}

button {
    cursor: pointer;
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