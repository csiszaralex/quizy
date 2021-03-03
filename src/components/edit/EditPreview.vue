<template>
  <div class="row mx-3 my-2 qSet py-3 d-flex justify-content-center" :style="{ order: srsz }">
    <fa-layers
      v-if="isFirst"
      full-width
      class="mb-2 col-2 btn btn-primary fa-3x m-1 p-1 py-3"
      @click="$emit('down')"
    >
      <fa-icon :icon="['fas', 'arrow-up']" />
    </fa-layers>
    <div v-else class="col-2"></div>
    <fa-layers
      v-if="isLast"
      full-width
      class="mb-2 col-2 btn btn-primary fa-3x m-1 p-1 py-3"
      @click="$emit('up')"
    >
      <fa-icon :icon="['fas', 'arrow-down']" />
    </fa-layers>
    <div v-else class="col-2"></div>
    <div class="col-7 text-center" @click="$emit('go')">{{ kiNev }}</div>
  </div>
</template>

<script>
export default {
  name: 'EditPreview',
  props: ['srsz', 'nev', 'max'],
  emits: ['up', 'down', 'go'],
  computed: {
    kiNev() {
      if (this.nev.length < 22) return this.nev;
      return this.nev.substring(0, 20) + '...';
    },
    isFirst() {
      return this.srsz !== 1 && this.srsz <= this.max;
    },
    isLast() {
      return this.srsz < this.max;
    },
  },
};
</script>
