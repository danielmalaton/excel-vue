<script setup lang="ts">
import { ref } from 'vue';
import DataTable from './components/DataTable.vue';

const headers = [
  {
    id: 1,
    label: 'A',
  },
  {
    id: 2,
    label: 'B',
  },
  {
    id: 3,
    label: 'C',
  },
];
const rows = ref([
  {
    rowId: 1,
    rowValue: [{ id: 1, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 3 }],
  },
  {
    rowId: 2,
    rowValue: [{ id: 1, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 3 }],
  },
  {
    rowId: 3,
    rowValue: [{ id: 1, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 3 }],
  },
]);

function onUpdateCell ({ colId, rowId, newValue}: { colId: number, rowId: number, newValue: number }) {
  const row = rows.value.find(row => row.rowId === rowId);
  if (!row) return;

  const cell = row.rowValue.find(cell => cell.id === colId);
  if (!cell) return;

  cell.value = newValue;
}
</script>

<template>
  <div>
    <!-- <DataTableConfig /> -->
    <DataTable
      :headers
      :rows
      @update-cell="onUpdateCell"
    />
  </div>
</template>

