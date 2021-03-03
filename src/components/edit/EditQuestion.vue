<template>
  <div class="container-fluid w-100">
    <div class="h-50 col-9">asd</div>
    <textarea v-model="data.name" cols="30" rows="5"></textarea>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  name: 'EditQuestion',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, context) {
    const data = ref(props.modelValue);
    watch(data, () => {
      context.emit('update:modelValue', data.value);
    });

    return { data };
  },
};
</script>
