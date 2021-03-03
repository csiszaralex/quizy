<template>
  <div class="row mx-3 my-2 qSet py-3 d-flex justify-content-center" :style="{ order: srsz }">
    <div class="col-2 btn" @click="up">F</div>
    <div class="col-8 text-center" @click="go">{{ srsz }} - {{ kiNev }}</div>
    <div class="col-2 btn" @click="down">L</div>
  </div>
</template>

<script>
export default {
  name: 'EditPreview',
  props: ['srsz', 'nev'],
  emits: ['up', 'down', 'go'],
  computed: {
    kiNev() {
      if (this.nev.length < 22) return this.nev;
      return this.nev.substring(0, 20) + '...';
    },
  },
  methods: {
    up() {
      this.$emit('up');
    },
    down() {
      this.$emit('down');
    },
    go() {
      this.$emit('go');
    },
  },
};
</script>
