<template>
  <div class="container h-100 w-100 my-5 flex-grow-1">
    <div class="row">
      <div v-for="(item, index) in dirs" :key="index" class="col-2 card m-2 bg-primary">
        <base-badge></base-badge>
        <!-- <div>DIR - {{ item.name }}</div> -->
      </div>
      <div v-for="(item, index) in data" :key="index" class="col-2 card m-2 bg-success">
        <div v-if="!isDir(item)">ITEM - {{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const datas = ref();
    const dirs = ref();
    store.dispatch('teacher/getQuizez').then(() => {
      datas.value = store.getters['teacher/getData'];
      dirs.value = store.getters['teacher/getDirs'];
      console.log(dirs.value);
    });

    const data = computed(() => {
      return datas.value;
    });
    function isDir(object) {
      let back = false;
      Object.keys(object).forEach(x => {
        back = typeof object[x] === 'object';
      });
      return back;
    }

    return { data, isDir, dirs };
  },
};
</script>
<style lang="scss" scoped></style>
