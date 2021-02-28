<template>
  <div class="container-fluid flex-grow-1 d-flex p-0">
    <base-dialog :show="!!uzenet" title="Folyamatban" @close="elfogad">
      <p>{{ uzenet }}</p>
    </base-dialog>
    <div class="col-3 flex-grow-1 d-flex flex-column bg-light">
      <div class="flex-grow-1 d-flex flex-column">
        <edit-preview
          v-for="item in data.questions"
          :key="item"
          :srsz="item.srsz"
          :nev="item.name"
        ></edit-preview>
        <edit-preview :srsz="99" nev="PLUSZ"></edit-preview>
      </div>
      <div class="text-center py-2 qSet">
        <p class="btn d-block p-0 gomb mb-2" @click="wip">Importálás</p>
        <p class="btn d-block p-0 gomb mb-2" @click="wip">Exportálás</p>
        <p class="btn d-block p-0 gomb mb-2">Beállítások</p>
      </div>
    </div>
    <div class="col-9 flex-grow-1">Ediiit {{ id }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import teacher from '@/config/axiosTeacher.config';
import editPreview from '../components/edit/editPreview.vue';

export default {
  name: 'Edit',
  components: { editPreview },
  props: ['id'],
  setup(props) {
    const store = useStore();
    const id = store.getters.getId;

    const data = ref({});
    teacher.get(`/${id}/${props.id}.json`).then(res => {
      data.value = res.data;
    });

    return { data };
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
