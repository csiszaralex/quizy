<template>
  <div id="fo" class="container-fluid d-flex flex-column justify-content-between">
    <the-header />

    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component" />
      </transition>
    </router-view>

    <the-footer v-if="footer" />
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
  name: 'App',
  components: { TheHeader, TheFooter },
  setup() {
    const route = useRoute();

    const akt = computed(() => {
      return route.path;
    });
    const footer = computed(() => {
      return ['home', 'auth', 'choose', 'notfound'].includes(route.name);
    });

    return { akt, footer };
  },
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

.container-fluid {
  padding: 0;
}
#fo {
  min-height: 100vh;
}
</style>
