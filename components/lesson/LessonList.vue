<template>
  <div
    :class="{
      'flex flex-col gap-4': view === 'list',
      'grid gap-4 grid-cols-2': view === 'compact',
      'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': view === 'large'
    }"
  >
  <LessonCard
    v-for="lesson in lessons"
    :key="lesson.id"
    :lesson="lesson"
    :view="view"
    :courseSlug="courseSlug"
    :level="level"
  />
  </div>
</template>

<script setup lang="ts">
import LessonCard from './LessonCard.vue'

defineProps<{
  lessons: Array<any>
  view: 'list' | 'compact' | 'large'
  courseSlug: string
  level: string
}>()
</script>