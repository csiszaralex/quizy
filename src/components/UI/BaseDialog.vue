<template>
  <teleport to="body">
    <div v-if="show" class="backdrop" @click="tryClose"></div>
    <transition name="dialog">
      <dialog v-if="show" open class="m-0 mt-n5 p-0 overflow-hidden border-0">
        <header class="w-100 p-3" :class="'bg-' + type">
          <slot name="header">
            <h2 class="m-0">{{ title }}</h2>
          </slot>
        </header>
        <section class="p-3 pb-0">
          <slot></slot>
        </section>
        <menu
          v-if="!fixed"
          class="m-0 p-3 pt-0 d-flex"
          :class="[
            btn2Text === '' ? 'justify-content-end' : 'justify-content-between',
            reverse ? 'flex-row-reverse' : '',
          ]"
        >
          <slot name="actions">
            <base-button v-if="btn2Text !== ''" :type="btn2Type" @click="trySend">
              {{ btn2Text }}
            </base-button>

            <base-button :type="btn" @click="tryClose">{{ closeText }}</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Error!',
    },
    fixed: {
      type: Boolean,
      required: false,
    },
    type: {
      type: String,
      default: 'info',
    },
    btn: {
      type: String,
      default: 'primary',
    },
    closeText: {
      type: String,
      default: 'Bezárás',
    },
    btn2Text: {
      type: String,
      default: '',
    },
    btn2Type: {
      type: String,
      default: 'success',
    },
    reverse: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['close', 'send'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
    trySend() {
      if (this.fixed) {
        return;
      }
      this.$emit('send');
    },
  },
};
</script>

<style scoped lang="scss">
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: white;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
