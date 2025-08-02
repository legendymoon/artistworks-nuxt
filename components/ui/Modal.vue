<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    @click.self="close"
  >
    <div class="bg-white rounded-lg p-6 w-[90%] max-w-lg shadow-lg relative">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-black" @click="close">
        <Icon name="x" />
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'

const emit = defineEmits(['close'])
function close() {
  emit('close')
}
</script>