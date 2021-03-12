<template>
  <div class="container-fluid flex-grow-1 d-flex p-0">
    <teleport to="#quizNav">
      <div class="flex-grow-1">
        <input v-model="data.name" class="form-control" type="text" />
      </div>
      <div>
        <base-button @click="sett">
          <fa-icon :icon="['fas', 'cog']" />
        </base-button>
        <!-- TODO TESZT -->
        <base-button type="warning">Teszt</base-button>
        <base-button type="success" @click="save">
          <fa-icon :icon="['fas', 'save']" class="fa-1x mr-1" />
          Mentés
        </base-button>
        <base-button to="/teacher" type="danger">
          <fa-icon :icon="['far', 'window-close']" class="fa-1x mr-1" />
        Elvetés
        </base-button>
      </div>
    </teleport>
    <base-dialog :show="!!uzenet" title="Folyamatban" @close="elfogad">
      <p>{{ uzenet }}</p>
    </base-dialog>
    <base-dialog
      :show="settings"
      title="Beállítások"
      btn="outline-danger"
      btn2-text="Bezárás"
      close-text="Teszt törlés"
      @close="deleteQuiz"
      @send="bezar"
    >
      <label for="desc" class="form-label">Leírás</label>
      <input id="desc" v-model="data.desc" type="text" class="form-control" />
      <div class="form-text mb-4">
        Itt adhat meg hosszabb leírást, melyet a kitöltők a teszt megkezdése előtt láthatnak.
      </div>
      <label for="limit" class="form-label">Időlimit</label>
      <input id="limit" v-model="data.limit" type="text" class="form-control" />
      <div class="form-text mb-4">
        Beállíthatod, hogy hány perc álljon rendelkezésre a teljes teszt kitöltésére és leadására.
        <br />
        Alapértelmezetten:0 - nincs időlimit
      </div>
      <label for="type" class="form-label">Típus</label>
      <select id="type" v-model="data.type" class="form-select">
        <option value="private">Privát</option>
        <option value="public">Publikus</option>
      </select>
      <div class="form-text mb-4">{{ typeDesc }}</div>
    </base-dialog>
    <div class="col-3 flex-grow-1 d-flex flex-column bg-light">
      <div class="flex-grow-1 d-flex flex-column">
        <edit-preview
          v-for="item in data.questions"
          :key="item"
          :srsz="item.srsz"
          :nev="item.name"
          :max="max"
          @up="move(item, -1)"
          @down="move(item, 1)"
          @go="go(item)"
        ></edit-preview>
        <div
          class="row mx-3 my-2 qSet py-1 d-flex justify-content-center cursor-pointer"
          :style="{ order: max + 1 }"
          @click="plusz"
        >
          <!-- <div class="col-8 text-center">Plusz</div> -->
          <fa-icon :icon="['far', 'plus-square']" class="fa-4x mr-1" />
        </div>
      </div>
      <div class="text-center py-1 qSet">
        <p class="btn d-block p-0 gomb mb-2" @click="wip">
          <fa-icon icon="file-upload" class="fa-1x mr-1" />
          Importálás
        </p>
        <p class="btn d-block p-0 gomb mb-2" @click="wip">
          <fa-icon icon="file-download" class="fa-1x mr-1" />
          Exportálás
        </p>
        <p class="btn d-block p-0 gomb mb-2" @click="sett">
          <fa-icon icon="cog" class="fa-1x mr-1" />
          Beállítások
        </p>
      </div>
    </div>
    <edit-question v-if="!!question" v-model="question" @del="del(question.srsz)"></edit-question>
    <div v-else class="col-9"></div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { v4 as uuid } from 'uuid';
import teacher from '@/config/axiosTeacher.config';
import EditPreview from '@/components/edit/EditPreview.vue';
import EditQuestion from '@/components/edit/EditQuestion.vue';

export default {
  name: 'Edit',
  components: { EditPreview, EditQuestion },
  props: ['id', 'quest'],
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const id = store.getters.getId;

    const data = ref({});
    teacher.get(`/${id}/${props.id}.json`).then(res => {
      data.value = res.data;
      setQuest();
    });

    function move(item, count) {
      const id = item.srsz;
      for (const x in data.value.questions) {
        if (count === -1) {
          if (data.value.questions[x].srsz === id) data.value.questions[x].srsz++;
          else if (data.value.questions[x].srsz === id + 1) data.value.questions[x].srsz--;
        } else if (count === 1) {
          if (data.value.questions[x].srsz === id) data.value.questions[x].srsz--;
          else if (data.value.questions[x].srsz === id - 1) data.value.questions[x].srsz++;
        }
      }
    }
    function go(item) {
      Object.keys(data.value.questions).forEach(x => {
        if (data.value.questions[x].name === item.name) router.replace(`/edit/${props.id}/${x}`);
      });
      question.value = item;
    }
    const max = computed(() => {
      if (data?.value?.questions) return Object.keys(data.value.questions).length;
      return 0;
    });

    const question = ref();
    function setQuest() {
      Object.keys(data.value.questions).forEach(x => {
        if (x === props.quest) question.value = data.value.questions[x];
      });
    }

    function plusz() {
      const id = uuid.v4();
      const uj = {
        ans1: {
          name: '',
          point: 10,
        },
        ans2: {
          name: '',
          point: 0,
        },
        ans3: {
          name: '',
          point: 0,
        },
        ans4: {
          name: '',
          point: 0,
        },
        name: 'Új kérdés',
        srsz: max.value + 1,
      };
      data.value.questions[id] = uj;
      go(uj);
    }
    function save() {
      teacher.patch(`/${id}/${props.id}.json`, JSON.stringify(data.value));
    }
    function del(id) {
      for (const i in data.value.questions) {
        if (data.value.questions[i].srsz === id) delete data.value.questions[i];
        else if (data.value.questions[i].srsz > id) data.value.questions[i].srsz--;
      }
      go(data.value.questions[Object.keys(data.value.questions)[0]]);
    }

    const typeDesc = computed(() => {
      return data.value.type === 'private'
        ? `A privát teszteket kizárólag szereszteni tudja, így azok kitöltéséreés kitöltetésére nincs lehetőség.`
        : `A publikus teszteket bármikor kitöltetheti tanulóival, így ezek szerkesztése kihatással lehet a már kitöltött tesztek eredményére!`;
    });

    function deleteQuiz() {
      teacher.delete(`/${id}/${props.id}.json`);
      router.replace('/teacher');
    }

    return { data, move, go, max, plusz, question, save, del, typeDesc, deleteQuiz };
  },
  data() {
    return { uzenet: null, settings: false };
  },
  methods: {
    bezar() {
      this.settings = false;
    },
    sett() {
      this.settings = true;
    },
    elfogad() {
      this.uzenet = null;
    },
    wip() {
      this.uzenet = 'Ezen a funkción még dolgozunk, de hamarosan elérhető lesz.';
    },
  },
};
</script>

<style lang="scss" scoped>
.gomb {
  font-size: 1.1rem;
}
</style>
