<template>
  <div class="container-fluid flex-grow-1 d-flex p-0">
    <base-dialog :show="!!uzenet" title="Folyamatban" @close="elfogad">
      <p>{{ uzenet }}</p>
    </base-dialog>
    <div class="col-3 flex-grow-1 d-flex flex-column bg-light">
      <div class="flex-grow-1 d-flex flex-column">
        <!-- TODO Fel és Le mozgatás (up, down)=>move -->
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
        <edit-preview :srsz="max + 1" :max="max" nev="PLUSZ" @click="plusz"></edit-preview>
      </div>
      <div class="text-center py-2 qSet">
        <p class="btn d-block p-0 gomb mb-2" @click="wip">Importálás</p>
        <p class="btn d-block p-0 gomb mb-2" @click="wip">Exportálás</p>
        <p class="btn d-block p-0 gomb mb-2" data-bs-toggle="modal" data-bs-target="#settings">
          Beállítások
        </p>
      </div>
    </div>
    <div class="col-9 flex-grow-1 bg-secondary d-grid">
      <!-- TODO <edit-question v-model="question"></edit-question> -->
      <!-- <pre>{{ question }}</pre> -->
    </div>
    <!-- XXX <edit-settings></edit-settings> -->
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { v4 as uuid } from 'uuid';
import teacher from '@/config/axiosTeacher.config';
import EditPreview from '@/components/edit/EditPreview.vue';
//XXX import EditSettings from '@/components/edit/EditSettings.vue';
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
      // question.value = item;
    }
    const max = computed(() => {
      return Object.keys(data.value.questions).length;
    });

    // const question = ref();
    function setQuest() {
      // Object.keys(data.value.questions).forEach(x => {
      // if (x === props.quest) question.value = data.value.questions[x];
      // });
    }

    function plusz() {
      const id = uuid.v4();
      const uj = {
        ans1: {
          name: '',
          point: 0,
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

    return { data, move, go, max, plusz };
  },
  data() {
    return { uzenet: null };
  },
  methods: {
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
