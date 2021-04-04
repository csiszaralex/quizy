<template>
  <stat-start v-if="!data?.from" @start="start">Teszt indítása</stat-start>
  <stat-invite v-else-if="showInv" :id="id" @start="showStat"></stat-invite>
  <div v-else class="container-fluid row flex-grow-1 m-0 p-0">
    <p>STAT</p>
    <base-table :data="stat"></base-table>
    <pre class="col-6">{{ data.stat }}</pre>
    <pre class="col-6">{{ stat }}</pre>
  </div>
</template>

<script>
import { ref } from 'vue';
import StatStart from '../components/stat/StatStart';
import StatInvite from '../components/stat/StatInvite';
import fills from '../config/axiosFills.config';
import teacher from '../config/axiosTeacher.config';
export default {
  name: 'Stat',
  components: { StatStart, StatInvite },
  props: { id: { type: String, required: true } },
  setup(props) {
    const data = ref();
    const stat = ref([]);
    const showInv = ref(false);

    function getAll() {
      fills.get(`/${props.id}.json`).then(res => {
        data.value = res.data;
        if (!res.data.stat) showInv.value = true;

        teacher.get(`/${res.data.owner}/${res.data.testId}.json`).then(teszt => {
          for (const row in res.data.stat) {
            const d = res.data.stat[row];

            const newRow = {
              Név: d.name,
              Pontszám: d.point,
              Százalék: Math.round((d.point / d.max) * 100) + ' %',
              idő: new Date(new Date(d.end ? d.end : new Date().getTime()) - new Date(d.start))
                .toISOString()
                .substring(14, 19),
            };
            if (d.points)
              for (const quest in teszt.data.questions) {
                newRow[teszt.data.questions[quest].name] = d.points[quest];
              }

            stat.value.push(newRow);
          }
        });
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

    function showStat() {
      showInv.value = false;
    }

    return { data, start, showInv, showStat, stat };
  },
};
</script>
