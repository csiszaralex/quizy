<template>
  <!-- SUBMIT -->
  <router-link :to="btnLink" v-if="!btnSend">
    <button :type="btnSend" class="btn" :class="[btnType, btnText]">
      <slot></slot>
    </button>
  </router-link>
  <button :type="btnSend" class="btn" :class="[btnType, btnText]" v-else>
    <slot></slot>
  </button>
</template>
<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  props: ['to', 'type', 'outline', 'submit'],
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
      return props.submit === '' || props.to !== '';
    });

    return { btnLink, btnType, btnText, btnSend };
  },
};
</script>
