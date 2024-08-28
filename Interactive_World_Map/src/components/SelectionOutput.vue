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
  id: '',
  name: '',
  capital: '',
  region: '',
  income: '',
})
//Get search from countrySearch.vue using pinia???? 
//Using search data, call API for country data???
async function getData(id) {
  const req = await fetch(`https://api.worldbank.org/v2/country/${id}?format=json`);
  const data = await req.json();
  console.log(data)
  countryData.id = data[1][0].id
}

onMounted(() => {
  getData(props.countryId);
})

</script>

<template>
  <div class="country-data-container" v-if="countryData.id">
    <RouterLink to="/">Back To Search</RouterLink>
    <p>{{ countryData.id }}</p>
  </div>

  <div v-else>
    <p>Loading Country Data... </p>
  </div>
</template>

<style scoped></style>
