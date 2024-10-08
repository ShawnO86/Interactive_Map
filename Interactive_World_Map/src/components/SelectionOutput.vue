<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

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
});

const errMsg = ref('');
const flagImage = ref('');

async function loadFlag() {
  //import svg as component
  let flag = await import(`../assets/svgs/flags/${props.countryId}.svg?raw`);
  flagImage.value = flag.default;
};

async function getData(url) {
  //calls argument url and waits for data
  const req = await fetch(url);
  try {
    //return api data in JSON
    const data = await req.json();
    return data;
  } catch (e) {
    console.log('error', e);
    errMsg.value = 'Error getting country data. Please try again later.';
  }
};

//does this need to be async?
async function getCountryInfo() {
  checkLocalForCountry()
  const data = await getData(`https://api.worldbank.org/v2/country/${props.countryId}?format=json`);
  try {
    //console.log(data[1][0])
    countryData.id = data[1][0].id;
    countryData.name = data[1][0].name;
    countryData.capital = data[1][0].capitalCity;
    countryData.region = data[1][0].region.value;
    countryData.income = data[1][0].incomeLevel.value;
  } catch (e) {
    console.log('error:', e)
    errMsg.value = 'No data available for this country.';
    countryData.id = '';
    countryData.name = '';
    countryData.capital = '';
    countryData.region = '';
    countryData.income = '';
  }
};

function checkLocalForCountry() {
  if (localStorage.getItem(countryData.id)) {
    console.log('in local storage')
  } else {
    console.log('not in local stoage')
  }
}

watch(() => props.countryId, () => {
  getCountryInfo();
  loadFlag();
});

onMounted(() => {
  getCountryInfo();
  loadFlag();
});

</script>

<template>
  <div class="country-data-container" v-if="countryData.id">
    <RouterLink to="/">Back to Search</RouterLink>
    <div v-html="flagImage"></div>
    <h2>{{ countryData.name }}</h2>
    <p>Capital: {{ countryData.capital }}</p>
    <p>Region: {{ countryData.region }}</p>
    <p>Income: {{ countryData.income }}</p>
  </div>

  <div v-else>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p v-else>Loading Country Data... </p>
  </div>
</template>

<style scoped></style>
