<template>
  <div class="container">
    TEACHER
    {{ logged }}
    {{ mail }}
    {{ name }}
    <br />
    {{ id }}
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
    const id = ref(store.getters.getId);
    return { logged, mail, name, id };
  }
};
</script>
