<template>
  <div class="flex-grow-1 d-flex flex-column justify-content-between">
    <div class="d-flex m-2 justify-content-between">
      <h5>{{ linkP }}</h5>
      <base-button @click="start">
        Kezdés
        <fa-icon icon="angle-double-right" />
      </base-button>
    </div>
    <div class="align-self-center text-center">
      <h2>Csatlakozz</h2>
      <h1>{{ id }}</h1>
    </div>
    <div
      class="d-flex m-3 justify-content-between align-items-center align-items-sm-end flex-column flex-sm-row"
    >
      <h6 class="d-flex align-items-center cursor-pointer" @click="copy">
        <fa-icon :icon="['far', 'copy']" class="fa-2x" /> &nbsp; Csatlakozási link másolása
      </h6>
      <qrcode-vue :value="link" :size="200" background="#f3f8fe" />
    </div>
  </div>
</template>

<script>
import useClipboard from 'vue-clipboard3';
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';

export default {
  name: 'StatInvite',
  components: { QrcodeVue },
  props: { id: { type: String, required: true } },
  emits: ['start'],
  setup(props, context) {
    const { toClipboard } = useClipboard();
    const link = ref(
      window.location.href
        .split('/')
        .slice(0, window.location.href.split('/').length - 2)
        .join('/') + `/fill/${props.id}`,
    );
    const linkP = ref(
      window.location.href
        .split('/')
        .slice(2, window.location.href.split('/').length - 2)
        .join('/'),
    );

    async function copy() {
      try {
        await toClipboard(link.value);
      } catch (e) {
        console.error(e);
      }
    }

    function start() {
      context.emit('start');
    }

    return { copy, link, start, linkP };
  },
};
</script>

<style lang="scss" scoped>
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
  @media screen and (max-width: 600px) {
    font-size: 3rem;
  }
}
</style>
