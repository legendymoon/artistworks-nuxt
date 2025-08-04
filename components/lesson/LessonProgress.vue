<template>
  <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
    <div class="bg-blue-600 h-2 rounded-full transition-[width] duration-150 ease-linear"
      :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ progress: number }>()
</script>