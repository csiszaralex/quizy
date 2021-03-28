<template>
  <div class="input-div">
    <fa-layers full-width class="fa-2x">
      <fa-icon :icon="icon" />
    </fa-layers>
    <div>
      <h2 class="selection-none"><slot /></h2>
      <input
        ref="input"
        v-model="data"
        :type="inputType"
        class="input"
        :autofocus="autofocus"
        @blur="blur"
        @focus="focus"
        @keyup="check"
        @click="check"
      />
    </div>
    <fa-icon
      v-if="type === 'password' && eye"
      :icon="['far', 'eye-slash']"
      class="cursor-pointer"
      @click="changeEye"
    />
    <fa-icon
      v-else-if="type === 'password'"
      :icon="['far', 'eye']"
      class="cursor-pointer"
      @click="changeEye"
    />
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
export default {
  name: 'BaseInput',
  props: ['modelValue', 'type', 'pattern', 'icon', 'autofocus'],
  emits: ['update:modelValue', 'check'],
  setup(props, context) {
    const data = ref(props.modelValue ? props.modelValue : '');
    watch(data, () => {
      context.emit('update:modelValue', data.value);
    });
    watch(props, () => {
      data.value = props.modelValue;
    });

    const eye = ref(true);
    function changeEye() {
      eye.value = !eye.value;
    }

    const inputType = computed(() => {
      return props.type ? (eye.value ? props.type : 'text') : 'text';
    });

    function blur(e) {
      let parent = e.target.parentNode.parentNode;
      if (data.value == '') parent.classList.remove('focus');
    }
    function focus(e) {
      let parent = e.target.parentNode.parentNode;
      parent.classList.add('focus');
    }
    function check(e) {
      const szulo = e.target.parentNode.parentNode;
      szulo.classList.remove('focus', 'okay', 'fail');
      if (data.value === '') {
        szulo.classList.add('focus');
        context.emit('check', { val: false });
      } else if (data.value.match(props.pattern)) {
        szulo.classList.add('okay');
        context.emit('check', { val: true });
      } else {
        szulo.classList.add('fail');
        context.emit('check', { val: false });
      }
    }

    return { data, inputType, blur, focus, check, eye, changeEye };
  },
  mounted() {
    if (this.$refs['input'].value !== '') this.check({ target: this.$refs['input'] });
  },
};
</script>

<style lang="scss" scoped>
$szin1: darken($primary, 10%);
$h2szin: $dark;
$feher: $light;
$fail: $danger;
$okay: $success;

.input-div {
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 10% 85% 5%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #ccc;
  width: 40vw;
  &:after,
  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: $szin1;
    transition: 0.3s;
  }
  &:after {
    right: 50%;
  }
  &:before {
    left: 50%;
  }
  &.focus {
    &:after,
    &:before {
      width: 50%;
    }
    .fa-layers {
      color: $szin1;
    }
    div h2 {
      top: -5px;
      font-size: 15px;
    }
  }
  &.fail {
    margin-bottom: 25px;
    &:after,
    &:before {
      width: 50%;
      background-color: $fail;
    }
    .fa-layers {
      color: $fail;
    }
    div h2 {
      top: -5px;
      font-size: 15px;
    }
    div small {
      display: block;
    }
  }
  &.okay {
    &:after,
    &:before {
      width: 50%;
      background-color: $okay;
    }
    .fa-layers {
      color: $okay;
    }
    div h2 {
      top: -5px;
      font-size: 15px;
    }
  }
  .fa-layers {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    em {
      color: $h2szin;
      transition: 0.3s;
    }
  }
  & > div {
    position: relative;
    height: 45px;
    h2 {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: $h2szin;
      font-size: 18px;
      transition: 0.3s;
    }
    .input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border: none;
      background: none;
      padding: 0.5rem;
      font-size: 1.2rem;
      color: $h2szin;
      outline: none;
    }
  }
  @media screen and (max-width: 768px) {
    width: 80vw;
  }
}
</style>
