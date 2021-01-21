<template>
  <!-- Image and text -->
  <nav class="navbar navbar-light bg-primary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#">
        <img
          src="https://via.placeholder.com/30"
          alt=""
          width="30"
          height="30"
          class="d-inline-block align-top"
        />
        Quizy
      </router-link>
      <div class="d-flex mr-n" v-if="isLoggedIn"></div>
      <div class="d-flex mr-n" v-if="isLoggedIn">
        <base-button to="/choose" type="warning" outline v-if="roles">Switch</base-button>
        <base-button @click="logout" type="danger" outline>Logout</base-button>
      </div>
      <div class="d-flex mr-n" v-else>
        <base-button to="/auth?mode=reg" type="info">Regisztráció</base-button>
        <base-button to="/auth?mode=login" type="success">Bejelentkezés</base-button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();

    const isLoggedIn = ref(store.getters.isLoggedIn);

    return { isLoggedIn };
  },
  methods: {
    async logout() {
      this.$store.dispatch('logout');
      this.$router.go('/');
    },
  },
  computed: {
    roles() {
      return this.$store.getters.isSwitchable;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding-top: 0;
  padding-bottom: 0;
  margin-right: 0;
  overflow-x: hidden;
  .mr-n {
    .btn {
      padding: 0.5rem 1.2rem;
      float: right;
    }
    margin-right: -1rem;
  }
}
</style>
