<template>
  <!-- <div class="container"> -->
  <footer class="text-center text-lg-start w-75 mx-auto footer">
    <hr />
    <div class="text-center p-3 row">
      <div class="col-md-3 mt-md-0 mt-2">
        Copyright ©2020-{{ year }}
        <br />
        By: Csiszár Alex
      </div>
      <div class="col-md-3 mt-md-0 mt-3">Impresszum</div>
      <div class="col-md-3 mt-md-0 mt-3">FB, GIT, KUKAC</div>
      <div class="col-md-3 mt-md-0 mt-3">Nyelv</div>
    </div>
  </footer>
  <!-- </div> -->
</template>

<script>
export default {
  setup() {
    const year = new Date().getFullYear();

    return { year };
  }
};
</script>

<style lang="scss" scoped>
div {
  margin-top: 20px;
  font-size: 0.7rem;
}
// .container {
//   position: absolute;
//   bottom: 0;
// }
</style>
