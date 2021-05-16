<template>
  <div v-if="sortedData" class="table-responsive">
    <base-dialog
      :show="!!delId"
      title="Biztosan törölni akarod?"
      type="danger"
      close-text="Mégse"
      btn="outline-warning"
      btn2-text="Törlés"
      btn2-type="outline-danger"
      reverse
      @close="delId = 0"
      @send="del"
    ></base-dialog>
    <table class="table table-hover">
      <thead>
        <tr>
          <th v-for="head in headers" :key="head" scope="col" @click="setSort(head)">
            <span class="mr-2">{{ head }}</span>
            <fa-icon v-if="sort === head && type === 1" icon="caret-up"></fa-icon>
            <fa-icon v-else-if="sort === head" icon="caret-down"></fa-icon>
          </th>
          <th v-if="editable || deletable"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in sortedData" :key="i">
          <td v-for="head in headers" :key="head + i">
            {{ row[head] ? row[head] : row[head] === 0 ? 0 : '-' }}
          </td>
          <td v-if="editable || deletable" class="text-center">
            <base-button
              v-if="editable"
              type="outline-warning btn-sm mx-1"
              @click="edit(row[editable])"
            >
              <fa-icon icon="edit"></fa-icon>
            </base-button>
            <base-button
              v-if="deletable"
              type="outline-danger btn-sm"
              @click="delId = row[editable]"
            >
              <fa-icon :icon="['far', 'trash-alt']"></fa-icon>
            </base-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>NINCS ADAT</div>
</template>

<script>
// TODO szűrő, és akár rendezés nyilakkal
import { computed, ref } from 'vue';
export default {
  name: 'BaseTable',
  props: {
    data: { type: Object, required: true },
    ignore: { type: Object, default: new Array(0) },
    editable: { type: String, default: '' },
    deletable: { type: String, default: '' },
  },
  emits: ['edit', 'delete'],
  setup(props, context) {
    const delId = ref(0);
    const headers = ref(['#']);
    function getHeaders() {
      for (const x of props.data) {
        for (const y in x) {
          if (!headers.value.includes(y) && !props.ignore.includes(y)) headers.value.push(y);
        }
      }
    }
    getHeaders();

    function edit(id) {
      context.emit('edit', id);
    }
    function del() {
      context.emit('delete', delId.value);
      delId.value = 0;
    }

    const sortedData = computed(() => {
      let ret = [];
      props.data.forEach((item, index) => {
        ret.push({ ...item, '#': index + 1 });
      });
      if (sort.value) {
        ret = ret.sort((a, b) => {
          return a[sort.value] === b[sort.value]
            ? 0
            : a[sort.value] > b[sort.value]
            ? type.value
            : -1 * type.value;
        });
      }
      return ret;
    });

    const sort = ref();
    const type = ref(1);
    function setSort(head) {
      if (sort.value !== head) {
        sort.value = head;
        type.value = 1;
      } else type.value = type.value === 1 ? -1 : 1;
    }

    return { headers, getHeaders, edit, del, delId, sort, setSort, type, sortedData };
  },
  watch: {
    data() {
      this.getHeaders();
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  td {
    vertical-align: middle;
  }
  th {
    vertical-align: middle;
    text-align: center;
    span,
    svg {
      cursor: pointer;
    }
  }
}
</style>
