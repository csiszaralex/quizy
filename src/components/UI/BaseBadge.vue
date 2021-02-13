<template>
  <component
    :is="isRouter"
    class="card m-2 text-dark text-decoration-none"
    :class="[background, orders, colSize]"
    :title="alt"
    :to="to"
  >
    <div class="card-body p-0 d-flex flex-column align-items-center">
      <h5 class="card-title text-muted h6 flex-fill">
        <span v-if="date">{{ date }}</span>
      </h5>
      <fa-layers v-if="type" full-width class="mb-2" :class="faSizes">
        <fa-icon :icon="['fas', type]" />
      </fa-layers>
      <div class="text-center" :class="headers">
        <slot />
      </div>
    </div>
  </component>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: ['type', 'date', 'color', 'order', 'alt', 'size', 'faSize', 'header', 'to'],
  computed: {
    background() {
      const color = this.color ? this.color : 'primary';
      return 'bg-' + color;
    },

    orders() {
      const order = this.order ? 'order-' + this.order : '';
      return order;
    },

    colSize() {
      return this.size ? 'col-' + this.size : 'col-2';
    },

    faSizes() {
      if (this.faSize) {
        const size = this.faSize > 10 ? 10 : this.faSize;
        return 'fa-' + size + 'x';
      } else if (this.size) {
        const size = this.size > 10 ? 10 : this.size;
        return 'fa-' + size * 2 + 'x';
      }
      return 'fa-4x';
    },

    headers() {
      return this.header ? 'h' + this.header : '';
    },

    isRouter() {
      return this.to ? 'router-link' : 'div';
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
}
</style>
