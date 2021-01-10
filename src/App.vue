<template>
  <the-header></the-header>

  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>

  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

// import { computed, watch } from 'vue';
// import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';

export default {
  components: { TheHeader, TheFooter },
  // setup() {
  //   const store = useStore();
  //   const router = useRouter();
  //   store.dispatch('autoLogin');

  //   const didAutoLogout = computed(() => {
  //     return store.getters.didAutoLogout;
  //   });
  //   watch(didAutoLogout, (curVal, oldVal) => {
  //     if (curVal && curVal !== oldVal) router.replace('/');
  //   });
  // }
};
</script>

<style lang="scss">
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
