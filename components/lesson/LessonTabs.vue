<!-- LessonTabs.vue -->
<template>
  <div class="border-b border-gray-200 text-sm sm:text-base">
    <ul class="flex gap-4">
      <li>
        <button
          class="pb-2"
          :class="activeTab === 'components' ? 'border-b-2 border-black font-medium' : 'text-gray-500 hover:text-black'"
          @click="$emit('update:modelValue', 'components')"
        >
          Lesson Components
        </button>
      </li>
      <li>
        <button
          class="pb-2"
          :class="activeTab === 'exchanges' ? 'border-b-2 border-black font-medium' : 'text-gray-500 hover:text-black'"
          @click="$emit('update:modelValue', 'exchanges')"
        >
          Video Exchanges
        </button>
      </li>
      <li class="hidden sm:block">
        <button
          class="pb-2"
          :class="activeTab === 'materials' ? 'border-b-2 border-black font-medium' : 'text-gray-500 hover:text-black'"
          @click="$emit('update:modelValue', 'materials')"
        >
          Study Materials
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const activeTab = computed(() => props.modelValue)
</script>