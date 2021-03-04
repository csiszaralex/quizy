<template>
  <div class="container-fluid col-9 flex-grow-1 p-1 d-grid ms-5">
    <div class="div1">
      KÉRDÉS
      <br />
      <input v-model="data.name" type="text" />
    </div>
    <div class="div2">
      Válasz1
      <br />
      <input v-model="data.ans1.name" type="text" />
    </div>
    <div class="div3">
      Válasz2
      <br />
      <input v-model="data.ans2.name" type="text" />
    </div>
    <div class="div4">
      Válasz3
      <br />
      <input v-model="data.ans3.name" type="text" />
    </div>
    <div class="div5">
      Válasz4
      <br />
      <input v-model="data.ans4.name" type="text" />
    </div>
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
    watch(props, () => {
      data.value = props.modelValue;
    });
    watch(data, () => {
      context.emit('update:modelValue', data.value);
    });

    return { data };
  },
};
</script>

<style lang="scss" scoped>
.d-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 2fr repeat(2, 1fr);
  grid-gap: 20px;
  .div1 {
    grid-area: 1 / 2 / 2 / 12;
    background-color: #9f9;
    place-self: center;
  }
  .div2 {
    grid-area: 2 / 1 / 3 / 7;
    background-color: #f99;
  }
  .div3 {
    grid-area: 2 / 7 / 3 / 13;
    background-color: #99f;
  }
  .div4 {
    grid-area: 3 / 1 / 4 / 7;
    background-color: #ff9;
  }
  .div5 {
    grid-area: 3 / 7 / 4 / 13;
    background-color: #f9f;
  }
}
</style>
