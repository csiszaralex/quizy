<template>
  <div :class="classes">
    <div class="d-flex justify-content-center align-items-center h-100 cursor-pointer">
      <h4>
        <slot></slot>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FillItem',
  props: ['classes'],
};
</script>
