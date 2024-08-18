<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
    MapImage: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['countrySvg']);

const tooltip_text = ref('');
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
        const svgData = {
            x: bBox.x,
            y: bBox.y,
            width: bBox.width,
            height: bBox.height,
            html: element.outerHTML
        };

        emit('countrySvg', svgData)
    }
};

</script>

<template>
    <div class="map-image" @click="handleSvgClick" @mousemove="displayTip" v-html="MapImage"></div>

    <div class="tooltip" v-if="tooltip_text" :style="{ top: tooltip_pos.top + 'px', left: tooltip_pos.left + 'px' }">
        {{ tooltip_text }}
    </div>
</template>

<style scoped>
.map-image {
    height: 100%;
    width: 100%;
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