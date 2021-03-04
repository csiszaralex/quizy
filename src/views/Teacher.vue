<template>
  <div class="container my-5 flex-grow-1">
    <div class="row">
      <!-- TODO Mappában is látni dolgokat -->
      <!-- TODO Drag and drop -->
      <!-- TODO Színek és minden a base-ben -->
      <template v-for="(item, index) in dirs" :key="index">
        <!-- Archive -->
        <base-badge
          v-if="isArchive(item)"
          type="archive"
          color="warning"
          order="0"
          :alt="item.name"
        >
          {{ item.name }}
        </base-badge>
        <!-- Mappa -->
        <base-badge v-else type="folder" order="1" :alt="item.name" :to="toLinkDir(item)">
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
};
</script>
