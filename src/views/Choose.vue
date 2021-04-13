<template>
  <div class="d-md-flex flex-row justify-content-around align-items-baseline">
    <choose-item role="Tanár" pic="user-graduate" @click="click('teacher')" />
    <choose-item role="Diák" pic="user" @click="click('student')" />
    <choose-item v-if="set" pic="user-plus" role="Mindkettő" @click="click('both')" />
  </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import ChooseItem from '../components/choose/ChooseItem';
export default {
  name: 'Choose',
  components: { ChooseItem },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    store.dispatch('role');
    const role = computed(() => {
      return store.getters.getRole;
    });
    watch(role, val => {
      if (val === 1) router.replace('/teacher');
      else if (val === 2) router.replace('/student');
      else if ([0, 3].includes(val) && route.query.redirect) {
        const redirect = '/' + route.query.redirect;
        router.replace(redirect);
      }
    });

    const set = computed(() => {
      return role.value === null;
    });
    function click(val) {
      if (!set.value) {
        router.replace(`/${val}`);
      } else {
        let roleSend = null;
        switch (val) {
          case 'teacher':
            roleSend = 1;
            break;
          case 'student':
            roleSend = 2;
            break;
          default:
            roleSend = 3;
            break;
        }
        store.dispatch('setRole', { role: roleSend });
      }
    }

    return { role, set, click };
  },
};
</script>
