<template>
  <div class="container-fluid flex-grow-1 d-flex">
    <div class="col-3 flex-grow-1 d-flex flex-column">
      <div class="h-75">Beállít</div>
      <div class="h-25 text-center py-2 qSet">
        <p>import</p>
        <p>Export</p>
        <p>Beállítások</p>
      </div>
    </div>
    <div class="col-9 flex-grow-1 bg-warning">Ediiit {{ id }}</div>
  </div>
</template>

<script>
export default {
  name: 'Edit',
  props: ['id'],
};
</script>
