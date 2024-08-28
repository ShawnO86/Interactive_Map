<script setup>
import { onMounted, onUpdated, reactive, ref, watch } from 'vue';

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
}

async function getCountryInfo(id) {
  const data = await getData(`https://api.worldbank.org/v2/country/${id}?format=json`);
  try {
    console.log(data[1][0])
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

watch(() => props.countryId, () => {
  getCountryInfo(props.countryId);
});

onMounted(() => {
  getCountryInfo(props.countryId);
});

</script>

<template>
  <div class="country-data-container" v-if="countryData.id">
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
