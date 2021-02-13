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
      <div class="d-flex mr-n" />
      <div v-if="isLoggedIn" class="d-flex mr-n align-items-center">
        <!-- TODO Itt profil szerkesztés -->
        <span class="mx-2">{{ name }}</span>
        <base-button v-if="roles" to="/choose" type="warning" outline>Switch</base-button>
        <base-button type="danger" outline @click="logout">Logout</base-button>
        <!-- HACK Itt rossz a design -->
        <span class="nav-item dropdown">
          <a
            id="navbarDropdown"
            class="nav-link dropdown-toggle text-dark"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider" />
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </span>
      </div>
      <div v-else class="d-flex mr-n">
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
  name: 'TheHeader',
  setup() {
    const store = useStore();

    const isLoggedIn = ref(store.getters.isLoggedIn);
    const name = ref(store.getters.getName);

    return { isLoggedIn, name };
  },

  computed: {
    roles() {
      return this.$store.getters.isSwitchable;
    },
  },

  methods: {
    async logout() {
      this.$store.dispatch('logout');
      this.$router.go('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding-top: 0;
  padding-bottom: 0;
  margin-right: 0;
  overflow: hidden visible;
  // overflow-x: hidden;
  // overflow-y: visible;
  .dropdown-menu {
    overflow-y: visible;
  }
  .mr-n {
    .btn {
      padding: 0.5rem 1.2rem;
      float: right;
    }
    margin-right: -1rem;
  }
}
</style>
