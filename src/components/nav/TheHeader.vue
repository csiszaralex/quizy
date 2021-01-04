<template>
  <!-- Image and text -->
  <nav class="navbar navbar-light bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="https://via.placeholder.com/30"
          alt=""
          width="30"
          height="30"
          class="d-inline-block align-top"
        />
        Quizy
      </a>
      <div class="d-flex mr-n">
        <button class="btn btn-info text-dark" type="submit">Regisztráció</button>
        <button class="btn btn-success text-light" type="submit">Bejelentkezés</button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  padding: 0;
  margin-right: 0;
  .mr-n {
    .btn {
      padding: 0.5rem 1.2rem;
      float: right;
    }
    margin-right: -1rem;
  }
}
</style>
