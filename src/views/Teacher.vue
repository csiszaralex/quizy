<template>
  <div class="">
    TEACHER
    {{ logged }}
    {{ mail }}
    {{ name }}
  </div>
</template>
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const logged = ref(store.getters.isLoggedIn);
    const mail = ref(store.getters.getEmail);
    const name = ref(store.getters.getName);
    return { logged, mail, name };
  }
};
</script>
