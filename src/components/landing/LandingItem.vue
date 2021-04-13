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
          :src="photos"
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
import stat from '../../assets/pics/homepage/stat.jpg';
import qr from '../../assets/pics/homepage/qr.jpg';
export default {
  name: 'Landingitem',
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
    change();

    return { floating, jo };
  },
  computed: {
    photos() {
      switch (this.photo) {
        case 'stat':
          return stat;
        case 'qr':
          return qr;
        default:
          return this.photo;
      }
    },
  },
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
p.card-text {
  font-size: 1.2rem;
}
</style>
