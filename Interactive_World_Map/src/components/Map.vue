<script setup>
    import MapImage from '../assets/map-image.svg?raw';

    function handleSvgClick(event) {
        const element = event.target;
        if (element.tagName == 'path') {
            const countryName = element.getAttribute('name');
            const countryId = element.getAttribute('id');
            console.log(countryName, countryId);
            element.style.fill = "var(--color-map-click)"
        };
    };
    function reverseColor(event) {
        event.target.style.fill = ''
    }
</script>

<template>
    <div class="svg-image" v-html="MapImage" @mousedown="handleSvgClick" @mouseup="reverseColor"></div>
</template>
