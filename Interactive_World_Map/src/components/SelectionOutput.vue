<script setup>
import { onMounted, reactive } from 'vue';

//prop sent through route url (/country/countryId)
const props = defineProps({
  countryId: {
    type: String,
    required: true
  }
});
const countryData = reactive({

})
//Get search from countrySearch.vue using pinia???? 
//Using search data, call API for country data???
async function getData(id) {

}

/* onMounted(() => {
  getData(props.countryId);
}) */

</script>

<template>
  <div class="country-data-container" v-if="countryData.name">

  </div>

  <div>
    <p>Loading Country Data...</p>
  </div>
</template>

<style scoped></style>
