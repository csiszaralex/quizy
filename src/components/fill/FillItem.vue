<template>
  <div :class="classes">
    <div class="d-flex justify-content-center align-items-center h-100 cursor-pointer">
      <h5>
        <slot></slot>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FillItem',
  props: ['classes'],
};
</script>
