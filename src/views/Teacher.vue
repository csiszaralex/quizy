<template>
  <div class="container mb-5 mt-2 flex-grow-1">
    <teleport to="#teacherNav">
      <base-button type="primary" to="/teacher" class="bg-dark-blue">
        <fa-icon icon="home" class="fa-1x mr-1" />
        Főoldal
      </base-button>
      <base-button type="primary" to="/fills">
        <fa-icon icon="edit" class="fa-1x mr-1" />
        Kitöltések
      </base-button>
    </teleport>
    <base-dialog
      :show="uj"
      title="Új teszt"
      close-text="Mégse"
      btn2-text="Létrehozás"
      reverse
      @close="megse"
      @send="ment"
    >
      <form @submit.prevent="ment">
        <label for="desc" class="form-label">Név</label>
        <input id="desc" v-model="newName" type="text" class="form-control" />
        <div class="form-text mb-4">
          Kérem adja meg a létrehozandó teszt nevét.
        </div>
      </form>
    </base-dialog>
    <div class="row m-4 mt-3 d-flex flex-row-reverse">
      <base-button class="col-md-2 d-flex align-items-center" @click="ujQ">
        <fa-icon :icon="['fas', 'plus-circle']" class="fa-2x mr-2" /> Új teszt
      </base-button>
    </div>
    <div class="row d-flex justify-content-center justify-content-md-start">
      <!-- TODO Mappában is látni dolgokat -->
      <!-- TODO Drag and drop -->
      <!-- TODO Színek és minden a base-ben -->
      <template v-for="(item, index) in dirs" :key="index">
        <!-- Archive -->
        <base-badge
          v-if="isArchive(item)"
          type="archive"
          color="danger"
          order="0"
          :alt="item.name"
          res-size="5"
          resp
        >
          {{ item.name }}
        </base-badge>
        <!-- Mappa -->
        <base-badge
          v-else
          type="folder"
          order="1"
          :alt="item.name"
          :to="toLinkDir(item)"
          res-size="5"
          resp
        >
          {{ item.name }}
        </base-badge>
      </template>
      <!-- Kérdés -->
      <template v-for="(item, index) in data" :key="index">
        <base-badge
          type="question"
          color="success"
          order="2"
          :date="item.createdAt"
          :alt="item.name"
          :to="toLinkQuiz(item)"
          :pub="item.type === 'private'"
          res-size="5"
          resp
        >
          {{ item.name }}
        </base-badge>
      </template>
    </div>
    {{ id }}
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import teacher from '@/config/axiosTeacher.config';
import { v4 } from 'uuid';
export default {
  name: 'Teacher',
  props: ['id'],
  setup() {
    const store = useStore();
    const datas = ref();
    const dirs = ref();
    store.dispatch('teacher/getQuizez').then(() => {
      datas.value = store.getters['teacher/getData'];
      dirs.value = store.getters['teacher/getDirs'];
      // console.log('dir', dirs.value);
      // console.log('key', Object.keys(dirs.value));
    });

    function isArchive(item) {
      return item.name === 'Archive';
    }
    function toLinkDir() {
      // Object.keys(dirs.value).forEach(x => {
      //   if (dirs.value[x].name === item.name) console.log(x);
      // });
      // console.log('item', item.name);
      return '/teacher';
    }
    function toLinkQuiz(item) {
      let val = '/teacher';
      Object.keys(datas.value).forEach(x => {
        if (datas.value[x].name === item.name) val = '/edit/' + x;
      });
      return val;
    }

    return { data: datas, dirs, isArchive, toLinkDir, toLinkQuiz };
  },
  data() {
    return { uj: false, newName: '' };
  },
  methods: {
    megse() {
      this.uj = false;
      this.newName = '';
    },
    ujQ() {
      this.uj = true;
    },
    ment() {
      if (this.newName.trim() !== '') {
        const questId = v4();
        teacher
          .post(
            `/${this.$store.getters.getId}.json`,
            JSON.stringify({
              createdAt:
                new Date()
                  .toISOString()
                  .split('T')[0]
                  .replace(/-/g, '.') + '.',
              name: this.newName.trim(),
              desc: '',
              limit: 0,
              type: 'private',
              questions: {
                [questId]: {
                  srsz: 1,
                  name: 'Első kérdés',
                  limit: 0,
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
                },
              },
            }),
          )
          .then(res => {
            this.$router.replace(`/edit/${res.data.name}/${questId}`);
          });
        this.megse();
      }
    },
  },
};
</script>
