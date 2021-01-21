<template>
  <!-- LOGO mellé  -->
  <!-- Error  -->
  <!-- animáció  -->
  <div class="">
    <slot></slot>
    <input :type="inputType" :placeholder="ph" v-model="data" />
  </div>
</template>
<script>
import { ref, watch, computed } from 'vue';
export default {
  props: ['ph', 'modelValue', 'type'],
  setup(props, context) {
    const data = ref(props.modelValue ? props.modelValue : '');

    watch(data, () => {
      context.emit('update:modelValue', data.value);
    });

    const inputType = computed(() => {
      //* type csak password legyen más, többire custom hiba
      return props.type ? props.type : 'text';
    });

    return { data, inputType };
  },
};
</script>
