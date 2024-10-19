<script setup lang="ts">
import { computed } from 'vue';
import { sum } from 'lodash';


const props = withDefaults(defineProps<{
  headers: { id: number, label: string }[]
  rows: { rowId: number, rowValue: { id: number, value: number }[] }[]
  applyRowTotal?: boolean
}>(), {
  applyRowTotal: true
});
const emits = defineEmits<{
  updateCell: [{ colId: number, rowId: number, newValue: number }]
}>();

// TODO: should split to each rows to avoid performance
const columnTotalRow = computed(() => {
  return props.rows.map(row => sum(row.rowValue.map(r => r.value)));
});

function onCellUpdate (e: KeyboardEvent) {
  if (e.code !== 'Escape' && e.code !== 'Enter') {
    return;
  }
  (e.target as HTMLElement).blur()
}
function onCellEdit (newValue: number, colId: number, rowId: number) {
  console.log(newValue)
  emits('updateCell', { colId, rowId, newValue });
}
</script>

<template>
  <table class="w-full border-collapse table-fixed">
    <tr>
      <th></th>
      <th
        v-for="header in headers"
        :key="header.id"
      >
        {{ header.label }}
      </th>
      <th v-if="applyRowTotal">Total</th>
    </tr>

    <tr
      v-for="(row, index) in rows"
      :key="row.rowId"
    >
      <td class="row-header">{{ index }}</td>
      <td
        v-for="cell in row.rowValue"
        :key="cell.id"
        contenteditable
        @keydown="onCellUpdate"
        @blur="(e) => onCellEdit(Number((e.target as HTMLElement).textContent), cell.id, row.rowId)"
      >
          {{ cell.value }}
      </td>
      <td class="font-bold">{{ columnTotalRow[index] }}</td>
    </tr>
  </table>
</template>

<style lang="postcss" scoped>
th, td {
  @apply border border-slate-300 p-2 text-right;
}

tr:nth-child(even) {
 @apply bg-gray-100;
}

.row-header {
  @apply text-left w-20;
}
</style>
