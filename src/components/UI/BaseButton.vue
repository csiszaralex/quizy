<template>
  <router-link :to="btnLink" :class="{ 'd-none': btnDisplay }">
    <button class="btn" :class="[btnType, btnText]">
      <slot></slot>
    </button>
  </router-link>
</template>
<script>
import { computed } from 'vue';
export default {
  props: ['to', 'type', 'hide'],
  setup(props) {
    const btnLink = computed(() => {
      return props.to ? props.to : '/';
    });
    const btnType = computed(() => {
      return props.type ? 'btn-' + props.type : 'btn-info';
    });
    const btnText = computed(() => {
      return ['btn-success', 'btn-secondary', 'btn-danger'].includes(btnType.value)
        ? 'text-light'
        : 'text-dark';
    });
    const btnDisplay = computed(() => {
      return props.hide ? props.hide.toString() !== 'false' : false;
    });

    return { btnLink, btnType, btnText, btnDisplay };
  }
};
</script>
