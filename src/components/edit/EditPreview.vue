<template>
  <div class="row mx-3 my-2 qSet py-3 d-flex justify-content-center" :style="{ order: srsz }">
    <div v-if="isFirst" class="col-2 btn text-" @click="$emit('down')">↑</div>
    <div v-else class="col-2"></div>
    <div v-if="isLast" class="col-2 btn" @click="$emit('up')">↓</div>
    <div v-else class="col-2"></div>
    <div class="col-8 text-center" @click="$emit('go')">{{ kiNev }}</div>
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
