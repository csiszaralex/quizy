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
          @up="move(item, -1)"
          @down="move(item, 1)"
          @go="go(item)"
        ></edit-preview>
        <edit-preview :srsz="99" nev="PLUSZ"></edit-preview>
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
      <div class="text center">
        asd
      </div>
      <!-- Ediiit {{ id }}
      <br />
      {{ quest }} -->
    </div>
    <edit-settings></edit-settings>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import teacher from '@/config/axiosTeacher.config';
import EditPreview from '@/components/edit/EditPreview.vue';
import EditSettings from '@/components/edit/EditSettings.vue';

export default {
  name: 'Edit',
  components: { EditPreview, EditSettings },
  props: ['id', 'quest'],
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const id = store.getters.getId;

    const data = ref({});
    teacher.get(`/${id}/${props.id}.json`).then(res => {
      data.value = res.data;
    });

    function move(item, count) {
      console.log(item, count);
      const asd = data.value.find(x => x === item);
      console.log(asd);
    }
    function go(item) {
      Object.keys(data.value.questions).forEach(x => {
        if (data.value.questions[x].name === item.name) router.replace(`/edit/${props.id}/${x}`);
      });
    }

    return { data, move, go };
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
