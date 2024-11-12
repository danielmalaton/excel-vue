<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { ref } from 'vue';
import { extractExpression } from '../utils/extractExpression';

const emits = defineEmits<{
  addExpression: [expression: { target: string, sources: string[] }]
}>();

const expression = ref('');
const inputRef = ref<HTMLElement | null>();
useEventListener(inputRef, 'keydown', (e) => {
  if (e.code === 'Enter') {
    e.preventDefault();
    emits('addExpression', extractExpression(expression.value));
    expression.value = '';
    return;
  }
});
</script>

<template>
  <input
    ref="inputRef"
    v-model="expression"
    type="text"
    class="w-full mb-2 border"
  >
</template>
