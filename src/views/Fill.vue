<template>
  <div
    class="container-fluid row flex-grow-1 m-0 p-0"
    :class="{ 'selection-none': options['denyCopy'] }"
    @click.right.prevent=""
  >
    <div class="d-grid" :class="{ change: options['change'] }">
      <div class="que">
        <h1>{{ aktQ?.name }}</h1>
      </div>
      <fill-item v-if="aktQ?.ans1" classes="ans1 bg-info" @click="change(aktQ.ans1)">
        {{ aktQ?.ans1.name }}
      </fill-item>
      <fill-item v-if="aktQ?.ans2" classes="ans2 bg-primary" @click="change(aktQ.ans2)">
        {{ aktQ?.ans2.name }}
      </fill-item>
      <fill-item v-if="aktQ?.ans3" classes="ans3 bg-primary" @click="change(aktQ.ans3)">
        {{ aktQ?.ans3.name }}
      </fill-item>
      <fill-item v-if="aktQ?.ans4" classes="ans4 bg-info" @click="change(aktQ.ans4)">
        {{ aktQ?.ans4.name }}
      </fill-item>
      <div v-if="aktQ?.sum && options['showEnd']" class="done">
        <h3>{{ aktQ?.sum }}</h3>
      </div>
      <template v-if="options['change']">
        <div class="prev bg-danger">Előző</div>
        <div class="next bg-info">Következő</div>
        <div class="list bg-warning">Kérdések</div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import axios from '@/config/axiosFills.config';
import teacher from '@/config/axiosTeacher.config';
import FillItem from '../components/fill/FillItem.vue';
export default {
  name: 'Fill',
  components: { FillItem },
  props: { id: { type: String, required: true } },
  setup(props) {
    const store = useStore();
    const options = ref({});
    const questions = ref([]);
    const limit = ref(0);
    const aktQ = ref();
    let point = 0;
    let maxP = 0;
    let qId = 0;

    onBeforeMount(async () => {
      let id = '';
      await axios.get(`/${props.id}.json`).then(({ data }) => {
        id = `${data.owner}/${data.testId}`;
        data.options.forEach(option => {
          options.value[option.name] = option.value;
        });
      });
      await teacher.get(`/${id}.json`).then(({ data }) => {
        limit.value = data.limit;
        for (const question in data.questions) {
          maxP += Math.max(
            data.questions[question].ans1.point,
            data.questions[question].ans2.point,
            data.questions[question].ans3.point,
            data.questions[question].ans4.point,
          );
          questions.value.push({ id: question, ...data.questions[question] });
        }
      });
      await axios.patch(`/${props.id}/stat.json`, {
        [store.getters['getId']]: { name: store.getters['getName'], start: new Date() },
      });
      questions.value.sort((x, y) => x.srsz - y.srsz);
      if (options.value['mix']) questions.value.sort(() => Math.random() - 0.5);
      aktQ.value = questions.value[qId];
    });

    function change(item) {
      point += item.point;
      if (questions.value.length - 1 > qId) {
        axios.patch(`/${props.id}/stat/${store.getters['getId']}/points.json`, {
          [aktQ.value.id]: item.point,
        });
        qId++;
        aktQ.value = questions.value[qId];
      } else {
        axios.patch(`/${props.id}/stat/${store.getters['getId']}/points.json`, {
          [aktQ.value.id]: item.point,
        });
        axios.patch(`/${props.id}/stat/${store.getters['getId']}.json`, {
          point,
          end: new Date(),
        });

        aktQ.value = {
          name: 'VÉGEEE',
          sum: `Sikeresen elértél ${point} pontot a ${maxP} pontból, így
          ${Math.floor((point / maxP) * 100)}
          %-ot sikerült elérned`,
        };
      }
    }

    //TODO Ha 44-es key akkor vágólap ürítése
    return { options, limit, aktQ, change };
  },
};
</script>

<style lang="scss" scoped>
.d-grid {
  display: grid;
  &.change {
    grid-template-columns: repeat(12, 1fr) 4fr;
    grid-template-rows: 0.5fr 1.5fr repeat(2, 1fr) 0.4fr;
  }
  &:not(.change) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 0.5fr 1.5fr repeat(2, 1fr);
  }
  grid-gap: 5px;
  .que {
    grid-area: 1 / 2 / 3 / 12;
    place-self: center;
  }
  div:not(.que):hover {
    color: blue;
    background-color: yellow !important;
  }
  .ans1 {
    grid-area: 3 / 1 / span 1 / 7;
  }
  .ans2 {
    grid-area: 3 / 7 / span 1 / 13;
  }
  .ans3 {
    grid-area: 4 / 1 / span 1 / 7;
  }
  .ans4 {
    grid-area: 4 / 7 / span 1 / 13;
  }
  .done {
    grid-area: 3 / 1 / span 2 / 13;
    place-self: center;
  }
  .prev {
    grid-area: 5 / 1 / span 1 / span 1;
  }
  .next {
    grid-area: 5 / 13 / span 1 / span 1;
  }
  .list {
    grid-area: 2 / 13 / span 3 / span 1;
  }
  .jo {
    background: #9f9;
  }
  .rossz {
    background: #f99;
  }
  @media print {
    background-color: white !important;
    color: white;
  }
}
</style>
