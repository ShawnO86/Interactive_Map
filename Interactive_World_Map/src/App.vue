<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isCountryView = computed(() => {
   if (route.params.countryId) {
    return true
   }
   return false
});

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
