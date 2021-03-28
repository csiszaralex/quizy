<template>
  <!-- TODO SUBMIT -->
  <!-- BUG A success-nek light legyen a színe, ne dark -->
  <button :type="btnSend" class="btn" :class="[btnType]" :disabled="disabled">
    <router-link v-if="!btnSend" :to="btnLink" class="text-reset text-decoration-none">
      <slot />
    </router-link>
    <slot v-else />
  </button>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  name: 'BaseButton',
  props: ['to', 'type', 'outline', 'disabled'],
  setup(props) {
    const route = useRoute();
    const btnLink = computed(() => {
      return props.to ? props.to : route.fullPath;
    });
    const btnType = computed(() => {
      const type = props.outline === '' ? 'btn-outline-' : 'btn-';
      return props.type ? type + props.type : type + 'info';
    });
    const btnText = computed(() => {
      const outliner = ['success', 'secondary', 'danger'].includes(props.type)
        ? 'text-light'
        : 'text-dark';

      return props.outline === '' ? '' : outliner;
    });
    const btnSend = computed(() => {
      //props.submit === '' ||
      return !props.to || props.to === '';
    });

    return { btnLink, btnType, btnText, btnSend };
  },
};
</script>
