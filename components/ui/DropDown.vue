<template>
  <select :value="modelValue" @change="onChange" class="border px-3 py-2 rounded">
    <option v-for="item in items" :key="item" :value="item">{{ item }}</option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: string[]
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const onChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
}
</script>
