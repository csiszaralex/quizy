<template>
  <base-badge :type="pic" size="5" fa-size="10" header="3" class="pt-3 mx-5" res-size="10" resp>
    {{ role }}
  </base-badge>
</template>

<script>
export default {
  name: 'ChooseItem',
  props: ['role', 'pic'],
};
</script>
