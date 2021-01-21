<template>
  <div class="">
    <p v-if="isLoading">Lading...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="!results || results.length === 0">No stored data.</p>
    <ul v-else-if="results && results.length > 0">
      <landing-item
        v-for="result in results"
        :key="result.id"
        :cim="result.cim"
        :alcim="result.alcim"
        :orientation="orient(result.id)"
        photo="https://via.placeholder.com/770x560"
      ></landing-item>
    </ul>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import LandingItem from '../components/landing/LandingItem.vue';
import axios from 'axios';
export default {
  components: { LandingItem },
  setup() {
    const results = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    function loadExp() {
      isLoading.value = true;
      error.value = null;
      axios
        .get('https://quizy5-default-rtdb.europe-west1.firebasedatabase.app/homepage.json')
        .then(res => {
          isLoading.value = false;
          const datas = [];
          for (const i in res.data) {
            datas.push({
              id: res.data[i].id,
              cim: res.data[i].cim,
              alcim: res.data[i].alcim,
            });
          }
          results.value = datas;
        })
        .catch(err => {
          console.log(err);
        });
    }

    function orient(id) {
      return id % 2 ? 'left' : 'right';
    }

    onBeforeMount(() => {
      loadExp();
    });
    return { isLoading, results, error, orient };
  },
};
</script>
