<template>
  <div v-if="data" class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th v-for="head in headers" :key="head" scope="col">{{ head }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" :key="i">
          <td scope="row">{{ i + 1 }}</td>
          <td v-for="head in headers" :key="head + i">
            {{ row[head] ? row[head] : row[head] === 0 ? 0 : '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  name: 'BaseTable',
  props: { data: { type: Object, required: true } },
  setup(props) {
    const headers = ref([]);
    watch(props, () => {
      for (const x of props.data) {
        for (const y in x) {
          if (!headers.value.includes(y)) headers.value.push(y);
        }
      }
    });

    return { headers };
  },
};
</script>
