<template>
  <!-- LOGO mellé  -->
  <!-- Error  -->
  <!-- animáció  -->
  <div class="">
    <slot />
    <input v-model="data" :type="inputType" :placeholder="ph" />
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
export default {
  name: 'BaseInput',
  props: ['ph', 'modelValue', 'type'],
  emits: ['update:modelValue'],
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
