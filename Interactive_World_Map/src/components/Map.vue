<script setup>
    import { ref, reactive } from 'vue';
    import MapImage from '../assets/map-image.svg?raw';

    const clicked_coutries = new Set();
    const current_country = ref('');
    const tooltip_text = ref('');
    const tooltip_pos = reactive({
        top: 0,
        left: 0
    });

    function handleSvgClick(event) {
        const element = event.target;
        const countryId = element.getAttribute('id');

        current_country.value = element.getAttribute('name');
        if (element.tagName == 'path') {
            if (clicked_coutries.has(countryId)) {
                element.style.fill = "";
                clicked_coutries.delete(countryId);
            } else {
                element.style.fill = "var(--color-map-selected)";
                clicked_coutries.add(countryId);
            }
        } 
        console.log(clicked_coutries);
    };

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

</script>

<template>
    <div class="svg-image" v-html="MapImage" @click="handleSvgClick" @mousemove="displayTip"></div>
    <div class="tooltip" :style="{top: tooltip_pos.top + 'px', left: tooltip_pos.left + 'px'}">{{ tooltip_text }}</div>
</template>

<style scoped>

    .svg-image{
        margin: 3rem;
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