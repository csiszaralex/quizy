<template>
  <div class="flex-grow-1 d-flex flex-column justify-content-between">
    <div class="align-self-end">
      <base-button class="m-2">
        Kezdés
        <fa-icon icon="angle-double-right" />
      </base-button>
    </div>
    <div class="align-self-center text-center">
      <h2>Csatlakozz</h2>
      <h1>{{ id }}</h1>
    </div>
    <div class="d-flex m-3 ">
      <h6 class="d-flex align-items-center cursor-pointer" @click="copy">
        <fa-icon :icon="['far', 'copy']" class="fa-2x" /> &nbsp; Csatlakozási link másolása
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatInvite',
  props: { id: { type: String, required: true } },
  methods: {
    copy() {
      
    }
  },
};
</script>

<style scoped>
.flex-grow-1 {
  background: rgb(208, 208, 254);
  background: radial-gradient(circle, rgba(240, 240, 254, 1) 0%, rgba(220, 220, 254, 1) 100%);
}
.fa-2x {
  color: #66f;
}
h1 {
  text-transform: uppercase;
  font-size: 7rem;
  letter-spacing: 1rem;
}
</style>
