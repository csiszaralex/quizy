<template>
  <div class="container-fluid flex-grow-1 d-flex">
    <base-dialog :show="!!uzenet" title="Folyamatban" @close="elfogad">
      <p>{{ uzenet }}</p>
    </base-dialog>
    <div class="col-3 flex-grow-1 d-flex flex-column">
      <div class="h-75">Diák</div>
      <div class="h-25 text-center py-2 qSet">
        <button @click="wip">Import</button>
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
  data() {
    return { uzenet: null };
  },
  methods: {
    elfogad() {
      this.uzenet = null;
    },
    wip() {
      this.uzenet = 'Ezen a funkción még dolgozunk, de hamarosan elérhető lesz.';
    },
  },
};
</script>
