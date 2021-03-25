<template>
  <base-badge :type="pic" size="4" fa-size="10" header="3" class="pt-3 mx-3" resp>
    {{ role }}
  </base-badge>
</template>

<script>
export default {
  name: 'ChooseItem',
  props: ['role', 'pic'],
};
</script>
