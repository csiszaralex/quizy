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
        <div v-if="type !== ''">
          <label for="type" class="form-label">Teszt</label>
          <select id="type" v-model="test" class="form-select">
            <option v-for="test in tests" :key="test.value" :value="test.value">
              {{ test.text }}
            </option>
          </select>
          <div class="form-text" :class="type === 'time' ? 'mb-1' : 'mb-4'">
            Válassza ki melyik tesztet szeretné kitöltetni.
            <br />
            FIGYELEM! Csak publikus teszteket lehet kitöltetni.
          </div>
          <template v-if="type === 'time'">
            <label for="type" class="form-label">Kezdési időpont</label>
            <input v-model="from" type="datetime-local" class="form-control mb-1" />
            <label for="type" class="form-label">Záró időpont</label>
            <input v-model="to" type="datetime-local" class="form-control mb-4" />
          </template>
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
        <div v-else class="d-md-flex justify-content-around">
          <choose-item role="Most" :pic="['far', 'clock']" @click="type = 'real'" />
          <choose-item role="Időzített" :pic="['far', 'calendar-alt']" @click="type = 'time'" />
        </div>
        <hr />
      </form>
    </base-dialog>
    <base-dialog
      :show="setup"
      title="Szerkesztés"
      close-text="Mégse"
      btn2-text="Mentés"
      type="dark-blue"
      reverse
      @close="csuk"
      @send="frissit"
    >
      <form @submit.prevent="frissit">
        <div>
          <label for="type" class="form-label">Kezdési időpont</label>
          <input v-model="id.from" type="datetime-local" class="form-control mb-1" />
          <label for="type" class="form-label">Záró időpont</label>
          <input v-model="id.to" type="datetime-local" class="form-control mb-4" />
          <template v-for="option in id.options" :key="option.key">
            <div class="form-check form-switch d-flex align-items-center my-1">
              <input
                :id="option.name"
                v-model="option.value"
                class="form-check-input cursor-pointer big mr-1"
                type="checkbox"
              />
              <label class="form-check-label selection-none" :for="option.name">
                {{ getOptionName(option.name) }}
              </label>
            </div>
          </template>
          <base-button type="danger" outline class="mt-2" @click="del">Törlés</base-button>
        </div>
        <hr />
      </form>
    </base-dialog>
    <base-dialog
      :show="activeTest"
      title="Teszt folyamatban"
      close-text="Rendben"
      type="warning"
      btn="success"
      @close="csukT"
    >
      <p class=" mb-4 mt-2">
        Ez a kitöltés jelenleg folyamatban van, így a beállításai már
        <em class="text-bold"> nem </em>
        változtathatóak!
      </p>
    </base-dialog>
    <div class="row m-4 mt-3 d-flex flex-row-reverse">
      <base-button class="col-md-2 d-flex align-items-center" type="primary" @click="ujQ">
        <fa-icon :icon="['fas', 'plus-circle']" class="fa-2x mr-4" /> Új kitöltés
      </base-button>
    </div>
    <div class="row d-flex justify-content-center justify-content-md-start">
      <template v-for="(item, index) in active" :key="index">
        <base-badge
          :type="item.type === 'real' ? ['far', 'clock'] : ['far', 'calendar-alt']"
          :color="item.type === 'real' ? 'info' : 'primary'"
          order="0"
          :alt="item.testName"
          res-size="5"
          resp
          @click="getCall(item, index)"
        >
          {{ item.testName }}
          <br />
          <small>{{ index }}</small>
        </base-badge>
      </template>
    </div>
    <div class="separator horizontal my-3 text-center w-100"></div>
    <div class="row d-flex justify-content-center justify-content-md-start">
      <template v-for="(item, index) in done" :key="index">
        <base-badge
          :type="item.type === 'real' ? ['far', 'clock'] : ['far', 'calendar-alt']"
          :color="item.type === 'real' ? 'info' : 'primary'"
          order="0"
          :alt="item.testName"
          res-size="5"
          resp
          @click="stat(index)"
        >
          {{ item.testName }}
          <br />
          <small>{{ index }}</small>
        </base-badge>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import ChooseItem from '../components/choose/ChooseItem';
import idGen from '../config/nanoid';
import teacher from '../config/axiosTeacher.config';
import fills from '../config/axiosFills.config';

export default {
  name: 'Fills',
  components: { ChooseItem },
  setup() {
    const store = useStore();
    const datas = ref();
    const type = ref('');
    const newH = ref('info');
    const from = ref(new Date(new Date().getTime() + 3600000).toISOString().substring(0, 16));
    const to = ref(new Date(new Date().getTime() + 3600000 * 2).toISOString().substring(0, 16));
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
        key: 'showEnd',
        name: 'Teszt végi visszajelzés',
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

    const done = ref({});
    const active = ref({});
    function getAll() {
      fills.get('.json').then(res => {
        for (const fill in res.data) {
          if (res.data[fill].owner === store.getters.getId) {
            if (
              res.data[fill].to &&
              new Date(res.data[fill].to) < new Date(new Date().getTime() + 3600000)
            ) {
              done.value[fill] = res.data[fill];
            } else {
              active.value[fill] = res.data[fill];
            }
          }
        }
      });
    }
    getAll();

    const tests = ref([]);
    const test = ref();
    teacher
      .get(`/${store.getters.getId}.json`)
      .then(res => {
        for (const x in res.data) {
          if (res.data[x].type === 'public') {
            tests.value.push({ value: x, text: res.data[x].name });
          }
        }
      })
      .then(() => {
        if (tests.value.length === 0) newH.value = 'danger';
        else test.value = tests.value[0].value;
      });

    return {
      data: datas,
      type,
      tests,
      test,
      newH,
      options,
      from,
      to,
      getAll,
      done,
      active,
    };
  },
  data() {
    return { uj: false, setup: false, activeTest: false, id: '', cId: '' };
  },
  methods: {
    getCall(item, index) {
      if (new Date(item.from) < new Date(new Date().getTime() + 3600000)) this.nyitT();
      else this.nyit(index);
    },
    getOptionName(name) {
      return this.options.filter(x => x.key === name)[0].name;
    },
    del() {
      fills.delete(`/${this.cId}.json`).then(() => {
        delete this.active[this.cId];
        this.csuk();
      });
    },
    frissit() {
      fills.patch(`/${this.cId}.json`, this.id).then(() => {
        this.csuk();
        this.getAll();
      });
    },
    csuk() {
      this.id = '';
      this.cId = '';
      this.setup = false;
    },
    nyit(id) {
      this.cId = id;
      this.id = JSON.parse(JSON.stringify(this.active[id]));
      this.setup = true;
    },
    csukT() {
      this.activeTest = false;
    },
    nyitT() {
      this.activeTest = true;
    },
    megse() {
      this.uj = false;
      this.type = '';
    },
    ujQ() {
      this.uj = true;
    },
    ment() {
      const opt = [];
      this.options.forEach(option => {
        opt.push({ name: option.key, value: option.value });
      });
      if (this.type !== '' && this.test) {
        const id = idGen.generate();
        let tName = '';
        this.tests.forEach(x => {
          if (x.value === this.test) tName = x.text;
        });
        const save = {
          [id]: {
            owner: this.$store.getters.getId,
            testId: this.test,
            testName: tName,
            type: this.type,
            options: opt,
          },
        };
        save[id]['from'] = this.from;
        if (this.type === 'time') {
          save[id]['to'] = this.to;
        }
        fills.patch('.json', save).then(res => {
          if (res.data[Object.keys(res.data)[0]].type === 'real')
            this.$router.replace(`/stat/${Object.keys(res.data)[0]}`);
          this.megse();
          this.getAll();
        });
      }
    },
    stat(id) {
      this.$router.replace(`/stat/${id}`);
    },
  },
};
</script>
