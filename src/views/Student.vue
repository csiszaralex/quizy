<template>
  <div class="container mb-5 mt-2 flex-grow-1 d-flex justify-content-center align-items-center">
    <base-dialog
      :show="!!err"
      title="Hiba"
      close-text="Rendben"
      type="danger"
      btn="success"
      @close="err = ''"
    >
      <h4>
        {{ err }}
      </h4>
      <hr />
    </base-dialog>
    <form class="d-flex align-items-center flex-column" @submit.prevent="start">
      <h3>Kérem adja meg a kitölteni kívánt teszt kódját:</h3>
      <br />

      <base-input
        v-model="id"
        type="text"
        pattern="^[A-Z]{6}$"
        icon="pencil-alt"
        class="mb-1"
        autofocus
        @check="check"
      >
        Azonosító
      </base-input>
      <small v-if="good" class="text-danger">A megadott formátum nem megfelelő!</small>
      <base-button type="success" :disabled="good" class="mt-4">INDÍT</base-button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/config/axiosFills.config';
export default {
  name: 'Student',
  setup() {
    const router = useRouter();

    const id = ref('');
    watch(id, () => {
      id.value = id.value.toUpperCase();
    });

    const good = ref(false);
    function check({ val }) {
      if (id.value !== '') good.value = !val;
      else good.value = false;
    }

    const err = ref('');

    function start() {
      if (good.value || id.value === '')
        err.value = 'A bevitt értéknek az alábbi formátumnak kell kinéznie: ABCDEF';
      else {
        axios.get(`/${id.value.toLowerCase()}.json`).then(res => {
          if (!res.data) err.value = 'Ilyen azonosítójú teszt NEM létezik!';
          else if (!res.data.from || new Date(res.data.from) > new Date())
            err.value = 'Ezt a tesztet még nem indították el!';
          else if (new Date(res.data.to) < new Date()) err.value = 'Ezt a tesztet már lezárták!';
          else router.replace(`/fill/${id.value.toLowerCase()}`);
        });
      }
    }

    return { id, start, check, good, err };
  },
};
</script>
