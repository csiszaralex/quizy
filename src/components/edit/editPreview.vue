<template>
  <div class="row mx-3 my-2 qSet py-3 d-flex justify-content-center" :style="{ order: srsz }">
    {{ srsz }} - {{ nev }}
  </div>
</template>

<script>
export default {
  name: 'EditPreview',
  props: ['srsz', 'nev'],
};
</script>
