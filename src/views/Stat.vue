<template>
  <stat-start v-if="!data?.from" @start="start">Teszt indítása</stat-start>
  <stat-invite v-else-if="showInv" :id="id"></stat-invite>
  <div v-else class="container-fluid row flex-grow-1 m-0 p-0">
    <p>STAT</p>
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
import { ref } from 'vue';
import StatStart from '../components/stat/StatStart';
import StatInvite from '../components/stat/StatInvite';
import fills from '../config/axiosFills.config';
export default {
  name: 'Stat',
  components: { StatStart, StatInvite },
  props: { id: { type: String, required: true } },
  setup(props) {
    const data = ref();
    const showInv = ref(false);

    function getAll() {
      fills.get(`/${props.id}.json`).then(res => {
        data.value = res.data;
        if (!res.data.stat) showInv.value = true;
      });
    }
    getAll();

    function start() {
      const now = new Date(new Date().getTime() + 3600000 * 2).toISOString().substring(0, 16);
      fills
        .patch(`/${props.id}.json`, {
          from: now,
        })
        .then(() => {
          data.value['from'] = now;
        });
    }

    return { data, start, showInv };
  },
};
</script>
