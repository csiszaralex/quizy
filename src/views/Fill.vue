<template>
  <div
    class="container-fluid row flex-grow-1 m-0 p-0"
    :class="{ 'selection-none': options['denyCopy'] }"
    @click.right.prevent=""
  >
    <div class="d-grid" :class="{ change: options['change'] }">
      <div v-if="timer > 0 && counter > 0" class="timer">
        {{ time }}
      </div>
      <div v-if="!options['change'] && counter > 0" class="counter">
        {{ counter }}/{{ questions.length }}
      </div>
      <div class="que">
        <h1>{{ aktQ?.name }}</h1>
      </div>
      <fill-item
        v-if="aktQ?.ans1"
        classes="ans1"
        :class="getCol(aktQ.ans1)"
        @click="change(aktQ.ans1)"
      >
        {{ aktQ?.ans1.name }}
      </fill-item>
      <fill-item
        v-if="aktQ?.ans2"
        classes="ans2"
        :class="getCol(aktQ.ans2)"
        @click="change(aktQ.ans2)"
      >
        {{ aktQ?.ans2.name }}
      </fill-item>
      <fill-item
        v-if="aktQ?.ans3"
        classes="ans3"
        :class="getCol(aktQ.ans3)"
        @click="change(aktQ.ans3)"
      >
        {{ aktQ?.ans3.name }}
      </fill-item>
      <fill-item
        v-if="aktQ?.ans4"
        classes="ans4"
        :class="getCol(aktQ.ans4, 'bg-info')"
        @click="change(aktQ.ans4)"
      >
        {{ aktQ?.ans4.name }}
      </fill-item>
      <div v-if="aktQ?.sum && options['showEnd']" class="done">
        <h2>{{ aktQ?.sum }}</h2>
        <h3 class="text-center mt-4">{{ aktQ?.percent }}</h3>
      </div>
      <template v-else-if="options['change']">
        <div v-if="qId !== 0" class="prev">
          <base-button type="secondary" class="text-light" @click="prevQ">Előző</base-button>
        </div>
        <div v-if="!isLast" class="next">
          <base-button type="secondary" class="text-light" @click="nextQ">Következő</base-button>
        </div>
        <div class="list d-flex flex-column justify-content-between">
          <div class="row px-3 border border-secondary border-3 py-2 pb-5 mx-1">
            <div
              v-for="(question, index) in questions"
              :key="index"
              class="col-2 text-center p-1 m-1 ml-2 border cursor-pointer q-prev mx-auto"
              :class="getPrevBg(question)"
              :title="question.name"
              @click="changeQ(index)"
            >
              {{ index + 1 }}
            </div>
          </div>
          <base-button type="secondary" class="text-light" @click="send">Befejezés</base-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed, watch } from 'vue';
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
    const show = ref(false);
    let point = 0;
    let maxP = 0;
    const qId = ref(0);
    const selects = ref({});
    const timer = ref();

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
          timer.value = +data.limit * 60;
          questions.value.push({ id: question, ...data.questions[question] });
        }
      });
      await axios.patch(`/${props.id}/stat.json`, {
        [store.getters['getId']]: { name: store.getters['getName'], start: new Date() },
      });
      questions.value.sort((x, y) => x.srsz - y.srsz);
      if (options.value['mix']) questions.value.sort(() => Math.random() - 0.5);
      aktQ.value = questions.value[qId.value];
    });

    function change(item) {
      point += item.point;
      if (options.value['change']) selects.value[aktQ.value.id] = { n: item.name, p: item.point };
      else if (questions.value.length - 1 > qId.value) {
        if (!show.value)
          axios.patch(`/${props.id}/stat/${store.getters['getId']}/points.json`, {
            [aktQ.value.id]: item.point,
          });
        if (!options.value['showPer'] || show.value) nextQ();
        else {
          show.value = true;
        }
      } else if (!options.value['change']) {
        axios.patch(`/${props.id}/stat/${store.getters['getId']}/points.json`, {
          [aktQ.value.id]: item.point,
        });
        axios.patch(`/${props.id}/stat/${store.getters['getId']}.json`, {
          point,
          end: new Date(),
        });

        aktQ.value = {
          name: 'Sikeres beküldés!',
          sum: `Elértél ${point} pontot a ${maxP}-${
            maxP % 10 !== 0
              ? [3, 6, 8].includes(maxP % 10)
                ? 'ból'
                : 'ből'
              : [20, 30, 60, 80, 0].includes(maxP % 100)
              ? 'ból'
              : 'ből'
          }!`,
          percent: `${Math.round((point / maxP) * 100)}%`,
        };
      }
    }
    function nextQ() {
      show.value = false;
      qId.value++;
      aktQ.value = questions.value[qId.value];
    }
    function prevQ() {
      show.value = false;
      qId.value--;
      aktQ.value = questions.value[qId.value];
    }
    function changeQ(id) {
      show.value = false;
      qId.value = id;
      aktQ.value = questions.value[qId.value];
    }

    function getCol(item) {
      if (options.value['change']) {
        if (selects.value[aktQ.value.id]?.n === item.name) {
          return 'active';
        }
        return '';
      } else if (show.value) {
        return item.point !== 0 ? 'jo' : 'rossz';
      }
      return '';
    }

    watch(timer, cur => {
      if (cur === 1) {
        axios.patch(`/${props.id}/stat/${store.getters['getId']}.json`, {
          point,
          end: new Date(),
        });
        aktQ.value = {
          name: 'Sikeres beküldés!',
          sum: `Elértél ${point} pontot a ${maxP}-${
            maxP % 10 !== 0
              ? [3, 6, 8].includes(maxP % 10)
                ? 'ból'
                : 'ből'
              : [20, 30, 60, 80, 0].includes(maxP % 100)
              ? 'ból'
              : 'ből'
          }!`,
          percent: `${Math.round((point / maxP) * 100)}%`,
        };
      }
      if (cur === -1) clearInterval(clock);
    });
    const clock = setInterval(() => {
      incTime();
    }, 1000);
    function incTime() {
      timer.value--;
    }
    const time = computed(() => {
      return `${Math.floor(timer.value / 60)}:${
        timer.value % 60 > 10 ? timer.value % 60 : `0${timer.value % 60}`
      }`;
    });

    const counter = computed(() => {
      return questions?.value.findIndex(x => x?.id === aktQ?.value?.id) + 1;
    });

    const isLast = computed(() => {
      return questions.value.length - 2 < qId.value;
    });
    function send() {
      for (const q in selects.value) {
        axios.patch(`/${props.id}/stat/${store.getters['getId']}/points.json`, {
          [q]: selects.value[q].p,
        });
      }
      axios.patch(`/${props.id}/stat/${store.getters['getId']}.json`, {
        point,
        end: new Date(),
      });
      aktQ.value = {
        name: 'Sikeres beküldés!',
        sum: `Elértél ${point} pontot a ${maxP}-${
          maxP % 10 !== 0
            ? [3, 6, 8].includes(maxP % 10)
              ? 'ból'
              : 'ből'
            : [20, 30, 60, 80, 0].includes(maxP % 100)
            ? 'ból'
            : 'ből'
        }!`,
        percent: `${Math.round((point / maxP) * 100)}%`,
      };
    }
    function getPrevBg(item) {
      let ret = '';
      if (item?.id === aktQ?.value?.id) ret += 'akt-prev ';
      if (selects.value[item?.id]) ret += 'kit-prev';
      return ret;
    }

    return {
      options,
      limit,
      aktQ,
      nextQ,
      prevQ,
      change,
      show,
      getCol,
      qId,
      isLast,
      send,
      changeQ,
      questions,
      getPrevBg,
      time,
      timer,
      counter,
    };
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
  div:is(.ans1, .ans2, .ans3, .ans4) {
    background-color: lighten($color: #3cc, $amount: 15);
    &:hover {
      background-color: #3cc;
    }
    &:active {
      color: $light;
      background-color: darken($color: #3cc, $amount: 10);
      border: 5px solid darken($color: #3cc, $amount: 30);
    }
  }
  .active {
    color: $light;
    background-color: darken($color: #3cc, $amount: 10) !important;
    border: 5px solid darken($color: #3cc, $amount: 30);
  }
  .timer {
    grid-area: 1 / 1 / span 1 / span 1;
    place-self: center;
    padding: 0.5rem;
    border: 2px solid $black;
  }
  .counter {
    grid-area: 1 / 12 / span 1 / span 1;
    place-self: center;
    padding: 0.5rem;
    border: 2px solid $black;
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
    justify-self: start;
    align-self: center;
  }
  .next {
    grid-area: 5 / 13 / span 1 / span 1;
    justify-self: end;
    align-self: center;
  }
  .list {
    grid-area: 2 / 13 / span 3 / span 1;
  }
  .akt-prev {
    border: 2px solid $black !important;
  }
  .kit-prev {
    background-color: $primary !important;
  }
  .jo {
    background: lighten($color: #3f5, $amount: 10) !important;
  }
  .rossz {
    background: lighten($color: #f35, $amount: 10) !important;
  }
  @media print {
    background-color: white !important;
    color: white;
  }
}
</style>
