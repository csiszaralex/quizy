<template>
  <div class="">
    TEACHER
    {{ logged }}
  </div>
</template>
<script>
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const logged = store.getters.isLoggedIn;

    return { logged };
  }
};
</script>
