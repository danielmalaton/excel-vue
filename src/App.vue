<script setup lang="ts">
import { ref } from 'vue';
import DataTable from './components/DataTable.vue';
import DataTableConfig from './components/DataTableConfig.vue';
import { Row } from './types';
import { findCellPosition } from './utils/findCellPosition';
import { sum } from 'lodash';

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
const rows = ref<Row[]>([
  {
    rowId: 0,
    rowValue: [{ id: 'A0', value: 0 }, { id: 'B0', value: 0 }, { id: 'C0', value: 0 }],
  },
  {
    rowId: 1,
    rowValue: [{ id: 'A1', value: 0 }, { id: 'B1', value: 0 }, { id: 'C1', value: 0 }],
  },
  {
    rowId: 2,
    rowValue: [{ id: 'A2', value: 0 }, { id: 'B2', value: 0 }, { id: 'C2', value: 0 }],
  },
]);

const deps = ref<Array<() => void>>([]);

function addExpression (expression: { target: string, sources: string[] }) {
  const func = () => {
    const targetCell = findCellPosition(rows.value, expression.target);

    if (!targetCell) return;

    targetCell.value = sum(expression.sources.map(cellId => findCellPosition(rows.value, cellId)?.value))
  }

  deps.value.push(func);
}

function onUpdateCell ({ cellId, rowId, newValue}: { cellId: string, rowId: number, newValue: number }) {
  const row = rows.value.find(row => row.rowId === rowId);
  if (!row) return;

  const cell = row.rowValue.find(cell => cell.id === cellId);
  if (!cell) return;

  cell.value = newValue;

  deps.value.forEach(dep => {
    dep();
  });
}
</script>

<template>
  <div>
    <DataTableConfig
      @add-expression="addExpression"
    />
    <DataTable
      :headers
      :rows
      @update-cell="onUpdateCell"
    />
  </div>
</template>

