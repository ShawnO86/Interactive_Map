<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

//Determines if current route is on SelectionOutput.vue or Map.vue
const isCountryView = computed(() => {
   if (route.params.countryId) {
    //if countryId in route - RouterView display SelectionOutput.vue
    return true
   }
   //RouterView display Map.vue
   return false
});

//Gets emit from Map.vue to send to SelectionOutput.vue dynamically
function goToCountryPage(id) {
  router.push(`/country/${id}`)
};

</script>

<template>

  <section class="cur-page">
    <RouterView v-if="isCountryView" />
    <RouterView v-else @countrySvgId="goToCountryPage" />
  </section>

</template>

<style scoped>
.cur-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
