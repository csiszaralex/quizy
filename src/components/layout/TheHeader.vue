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
      <div class="d-flex mr-n">
        <router-link to="/auth?mode=reg">
          <button class="btn btn-info text-dark" type="submit">Regisztráció</button>
        </router-link>

        <router-link to="/auth?mode=login">
          <button class="btn btn-success text-light" type="submit">Bejelentkezés</button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  padding: 0;
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
