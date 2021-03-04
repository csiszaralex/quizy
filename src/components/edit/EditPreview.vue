<template>
  <div class="row mx-3 my-1 qSet py-2 d-flex justify-content-center" :style="{ order: srsz }">
    <fa-layers
      v-if="isLast"
      full-width
      class="mb-2 col-2 btn btn-primary fa-3x m-1 p-1 py-3"
      @click="$emit('up')"
    >
      <fa-icon :icon="['fas', 'arrow-down']" />
    </fa-layers>
    <div v-else class="col-2"></div>
    <fa-layers
      v-if="isFirst"
      full-width
      class="mb-2 col-2 btn btn-primary fa-3x m-1 p-1 py-3"
      @click="$emit('down')"
    >
      <fa-icon :icon="['fas', 'arrow-up']" />
    </fa-layers>
    <div v-else class="col-2"></div>
    <div class="col-7 text-center pointed-text" @click="$emit('go')">{{ nev }}</div>
  </div>
</template>

<script>
export default {
  name: 'EditPreview',
  props: ['srsz', 'nev', 'max'],
  emits: ['up', 'down', 'go'],
  computed: {
    isFirst() {
      return this.srsz !== 1 && this.srsz <= this.max;
    },
    isLast() {
      return this.srsz < this.max;
    },
  },
};
</script>
