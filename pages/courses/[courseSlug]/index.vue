<template>
  <div class="px-4 py-10 max-w-screen-xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">{{ course?.title }}</h1>
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <LevelCard v-for="levelInfo in levels" :key="levelInfo.level" :level="levelInfo.level"
        :thumbnail="levelInfo.thumbnail" :description="levelInfo.description"
        :onClick="() => goToLevel(levelInfo.level)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LevelCard from '@/components/lesson/LevelCard.vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourses } from '@/composables/useCourses'
const route = useRoute()
const router = useRouter()

// Extract courseSlug from route params
const courseSlug = route.params.courseSlug as string
const { courses } = useCourses()
const course = courses.value.find(c => c.slug === courseSlug)

// Prepare levels data
const levels = course?.levels.map(level => {
  return {
    level,
    thumbnail: `/images/level-${level.toLowerCase()}.jpg`,
    description: `Learn the ${level} concepts in this course.`
  }
}) || []

// Function to navigate to a specific level
function goToLevel(level: string) {
  router.push(`/courses/${courseSlug}/${level.toLowerCase()}`)
}
</script>
