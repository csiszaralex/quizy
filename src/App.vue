<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/nav/TheHeader.vue';

export default {
  components: { TheHeader }
};
</script>

<style lang="scss">
body,
* {
  margin: 0;
  padding: 0;
  background-color: $info;
}
</style>
