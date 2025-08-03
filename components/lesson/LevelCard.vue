<template>
  <div
    @click="onClick"
    class="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <div class="h-40 w-full overflow-hidden">
      <img
        :src="thumbnail"
        alt=""
        class="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ level }}</h3>
      <p class="text-sm text-gray-600 mt-1">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  level: string
  thumbnail: string
  description: string
  onClick: () => void
}>()
</script>
