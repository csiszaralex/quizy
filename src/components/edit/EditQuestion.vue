<template>
  <div class="container-fluid col-9 flex-grow-1 p-1 d-grid ms-5">
    <div class="que">
      KÉRDÉS
      <br />
      <input v-model="data.name" type="text" class="w-100" />
    </div>
    <div
      v-for="ans in 4"
      :key="ans"
      :class="[data['ans' + ans].point > 0 ? 'jo' : 'rossz', 'ans' + ans]"
      @click.self="change(ans)"
    >
      <div class="my-3 mx-2 text-center w-50">
        Válasz1
        <input v-model="data['ans' + ans].name" type="text" />
      </div>
      <div v-if="data['ans' + ans].point !== 0" class="my-3 mx-2 text-center w-50">
        Pontszám
        <input v-model.number="data['ans' + ans].point" type="text" />
      </div>
    </div>
    <base-button v-if="deletable" class="del mt-4" type="danger" @click="$emit('del')">
      Törlés
    </base-button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  name: 'EditQuestion',
  props: ['modelValue', 'deletable'],
  emits: ['update:modelValue', 'del'],
  setup(props, context) {
    const data = ref(props.modelValue);
    watch(props, () => {
      data.value = props.modelValue;
    });
    watch(data, () => {
      context.emit('update:modelValue', data.value);
    });

    function change(id) {
      data.value['ans' + id].point = data.value['ans' + id].point === 0 ? 10 : 0;
    }

    return { data, change };
  },
};
</script>

<style lang="scss" scoped>
.d-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 2fr repeat(2, 1fr);
  grid-gap: 20px;
  .que {
    grid-area: 1 / 2 / 2 / 12;
    // place-self: center;
    align-self: center;
  }
  .ans1 {
    grid-area: 2 / 1 / 3 / 7;
  }
  .ans2 {
    grid-area: 2 / 7 / 3 / 13;
  }
  .ans3 {
    grid-area: 3 / 1 / 4 / 7;
  }
  .ans4 {
    grid-area: 3 / 7 / 4 / 13;
  }
  .del {
    grid-area: 1 / 12 / span 1 / span 1;
    align-self: center;
  }
  .jo {
    background: #9f9;
  }
  .rossz {
    background: #f99;
  }
}
</style>
