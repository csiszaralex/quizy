<template>
  <footer class="text-center text-lg-start w-75 mx-auto footer">
    <hr />
    <div class="p-3 d-flex justify-content-center">
      <div class="mt-md-0 mt-2">
        Copyright ©2020-{{ year }}
        <br />
        By: Csiszár Alex
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  setup() {
    const year = new Date().getFullYear();

    return { year };
  },
};
</script>

<style lang="scss" scoped>
div {
  font-size: 0.7rem;
}
</style>
