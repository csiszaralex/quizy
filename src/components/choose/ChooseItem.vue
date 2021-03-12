<template>
  <base-badge :type="pic" size="3" fa-size="10" header="3" class="pt-3" resp>{{ role }}</base-badge>
</template>

<script>
export default {
  name: 'ChooseItem',
  props: ['role'],
  computed: {
    pic() {
      let back = '';

      switch (this.role) {
        case 'teacher':
          back = 'user-graduate';
          break;
        case 'student':
          back = 'user';
          break;

        default:
          back = 'user-plus';
          break;
      }

      return back;
    },
  },
};
</script>
