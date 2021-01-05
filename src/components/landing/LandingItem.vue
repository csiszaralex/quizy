<template>
  <li>
    <div class="card m-auto w-75 my-4">
      <div class="card-body row">
        <div class="col-lg-6 mt-lg-4">
          <h5 class="card-title mb-5 lead">{{ cim }}</h5>
          <p class="card-text fancy">
            {{ alcim }}
          </p>
        </div>
        <img
          :src="photo"
          alt="LandingPhoto"
          class="col-lg-6 mt-2"
          :class="{ 'order-first': floating(orientation) && jo }"
        />
      </div>
    </div>
  </li>
</template>
<script>
import { ref } from 'vue';
export default {
  props: ['cim', 'alcim', 'photo', 'orientation'],
  setup() {
    const jo = ref(true);

    function floating(classes) {
      if (classes === 'right') return true;
      else return false;
    }
    window.addEventListener('resize', change, { passive: true });
    function change() {
      if (window.innerWidth > 992) jo.value = true;
      else jo.value = false;
    }

    return { floating, jo };
  }
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
  .lead {
    font-size: 1.7rem;
  }
  .fancy {
    font-size: 0.85rem;
  }
}
</style>
