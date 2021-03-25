<template>
  <div class="container mb-5 mt-2 flex-grow-1">
    <teleport to="#fillNav">
      <base-button type="primary" to="/teacher">
        <fa-icon icon="home" class="fa-1x mr-1" />
        Főoldal
      </base-button>
      <base-button type="primary" to="/fills" class="bg-dark-blue">
        <fa-icon icon="edit" class="fa-1x mr-1" />
        Kitöltések
      </base-button>
    </teleport>
    <base-dialog
      :show="uj"
      title="Új kitöltés"
      close-text="Mégse"
      btn2-text="Létrehozás"
      :type="newH"
      reverse
      @close="megse"
      @send="ment"
    >
      <form @submit.prevent="ment">
        <div v-if="type === 'real'">
          <label for="type" class="form-label">Teszt</label>
          <select id="type" v-model="test" class="form-select">
            <option v-for="test in tests" :key="test.value" :value="test.value">
              {{ test.text }}
            </option>
          </select>
          <div class="form-text mb-4">
            Válassza ki melyik tesztet szeretné kitöltetni.
            <br />
            FIGYELEM! Csak publikus teszteket lehet kitöltetni.
          </div>
          <template v-for="option in options" :key="option.key">
            <div class="form-check form-switch d-flex align-items-center my-1">
              <input
                :id="option.key"
                v-model="option.value"
                class="form-check-input cursor-pointer big mr-1"
                type="checkbox"
              />
              <label class="form-check-label selection-none" :for="option.key">
                {{ option.name }}
              </label>
            </div>
          </template>
        </div>
        <div v-else-if="type === 'time'">
          Idő
        </div>
        <div v-else class="d-md-flex justify-content-around">
          <choose-item role="Most" :pic="['far', 'clock']" @click="type = 'real'" />
          <choose-item role="Időzített" :pic="['far', 'calendar-alt']" @click="type = 'time'" />
        </div>
        <hr />
      </form>
    </base-dialog>
    <div class="row m-4 mt-3 d-flex flex-row-reverse">
      <base-button class="col-md-2 d-flex align-items-center" type="primary" @click="ujQ">
        <fa-icon :icon="['fas', 'plus-circle']" class="fa-2x mr-4" /> Új kitöltés
      </base-button>
    </div>
    <div class="row d-flex justify-content-center justify-content-md-start bg-danger">1</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import ChooseItem from '../components/choose/ChooseItem';
import teacher from '../config/axiosTeacher.config';
import fills from '../config/axiosFills.config';

export default {
  name: 'Fills',
  components: { ChooseItem },
  setup() {
    const store = useStore();
    const datas = ref();
    //: const type = ref('');
    const type = ref('real');
    const newH = ref('info');
    const options = ref([
      {
        key: 'change',
        name: 'Kérdések közti váltás engedélyezése',
        value: true,
      },
      {
        key: 'mix',
        name: 'Kérdések keverése',
        value: true,
      },
      {
        key: 'showPer',
        name: 'Válaszok mutatása kérdésenként',
        value: false,
      },
      {
        key: 'denyCopy',
        name: 'Másolás-beillesztés letiltása',
        value: false,
      },
      {
        key: 'denyScreen',
        name: 'Képernyőkép készítésének letiltása',
        value: false,
      },
    ]);

    const tests = ref([]);
    const test = ref();

    teacher
      .get(`/${store.getters.getId}.json`)
      .then(res => {
        for (const x in res.data) {
          if (res.data[x].type === 'public') {
            console.log(x + ' - ' + res.data[x].name);
            tests.value.push({ value: x, text: res.data[x].name });
          }
        }
      })
      .then(() => {
        if (tests.value.length === 0) newH.value = 'danger';
        else test.value = tests.value[0].value;
      });

    return { data: datas, type, tests, test, newH, options };
  },
  data() {
    //: return { uj: false };
    return { uj: true };
  },
  methods: {
    megse() {
      this.uj = false;
      this.type = '';
    },
    ujQ() {
      this.uj = true;
    },
    ment() {
      if (this.type !== '' && this.test) {
        fills
          .put('.json', {
            assd: {
              dsa: 5,
            },
          })
          .then(res => {
            console.log('DONE', res);
          });
      }
    },
  },
};
</script>
