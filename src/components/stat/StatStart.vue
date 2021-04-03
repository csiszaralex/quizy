<template>
  <div
    class="container-fluid flex-grow-1 m-0 p-0 d-flex justify-content-center align-items-center selection-none"
  >
    <span @click="start">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'StatStart',
  emits: ['start'],
  methods: {
    start() {
      this.$emit('start');
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  cursor: pointer;
  font-size: 3rem;
  text-transform: uppercase;
  background-color: darken($color: $primary, $amount: 15);
  padding: 0.75rem;
  &:hover {
    font-size: 4rem;
    padding: 1rem;
    background-color: $primary;
  }
}
</style>
