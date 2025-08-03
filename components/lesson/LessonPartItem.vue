<template>
  <div
    class="flex items-center justify-between p-4 gap-3 rounded-[8px] cursor-pointer transition bg-white hover:bg-gray-100"
    :class="{
      'bg-black text-white hover:bg-gray-800': active,
    }" @click.stop="props.onPlay?.()">
    <div class="relative mx-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-6 h-6"
        :class="{ 'text-white': active, 'text-black': !active }">
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" stroke-width="4" />
        <template v-if="isCurrent && isPlaying">
          <rect x="17" y="13" width="5" height="22" fill="currentColor" />
          <rect x="26" y="13" width="5" height="22" fill="currentColor" />
        </template>
        <template v-else>
          <polygon points="17,13 36,24 17,35" fill="currentColor" />
        </template>
      </svg>
    </div>

    <div class="p-1 flex-1">
      <div class="flex flex-col sm:flex-row sm:items-start mb-2 sm:justify-between">
        <h2 class="font-semibold text-[14px] mb-1 line-clamp-2 mt-1 sm:mt-0">
          {{ index }}.&nbsp;&nbsp;&nbsp;{{ lesson.title }} - Part {{ index }}
        </h2>
        <span class="hidden sm:inline text-xs px-2 py-0.5 rounded whitespace-nowrap">
          {{ formattedDuration }}
        </span>
      </div>
      <LessonProgress :progress="part.progress" class="flex-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatSecondsToTime } from '@/utils/formatTime'

const props = defineProps<{
  part: { id: number; duration: number; progress: number }
  lesson: { title: string; }
  index: number
  active?: boolean
  isPlaying?: boolean
  isCurrent?: boolean
  onPlay?: () => void
}>()

const formattedDuration = formatSecondsToTime(props.part.duration)
</script>