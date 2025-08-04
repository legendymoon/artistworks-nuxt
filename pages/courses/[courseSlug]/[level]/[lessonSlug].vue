<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useCourses } from '@/composables/useCourses'
import { useLessons } from '@/composables/useLessons'
import { useLessonParts } from '@/composables/useLessonParts'
import Icon from '@/components/ui/Icon.vue'
import VideoPlayer from '@/components/lesson/VideoPlayer.vue'
import LessonTabs from '@/components/lesson/LessonTabs.vue'
import LessonPartItem from '~~/components/lesson/LessonPartItem.vue'
const route = useRoute()
const router = useRouter()

const activeTab = ref('components')
// Import necessary composables
const { courses } = useCourses()
const { lessons } = useLessons()
const { lessonParts } = useLessonParts()

// Extract courseSlug, lessonSlug, and level from route parameters
const courseSlug = route.params.courseSlug as string
const lessonSlug = route.params.lessonSlug as string
const level = computed(() => (route.params.level as string).toLowerCase())
const course = computed(() =>
  courses.value.find(c => c.slug === courseSlug)
)

// Filter lessons for the current course and level
const lessonsInLevel = computed(() =>
  lessons.value.filter(
    l =>
      l.courseId === course.value?.id &&
      typeof l.level === 'string' &&
      l.level === level.value
  )
)

const lesson = computed(() =>
  lessonsInLevel.value.find(l => l.slug === lessonSlug)
)

// Filter lesson parts for the current lesson
const lessonPartsForLesson = computed(() =>
  lesson.value && lesson.value.id ? lessonParts.value.filter(p => p.lessonId === lesson.value!.id) : []
)
const currentPart = ref(lessonPartsForLesson.value[0])
const lessonComponentCount = computed(() => lessonPartsForLesson.value.length)

// Function to handle navigation to previous and next lessons
function goToPreviousLesson() {
  const idx = lessonsInLevel.value.findIndex(l => l.slug === lessonSlug)
  if (idx > 0) {
    const prevSlug = lessonsInLevel.value[idx - 1].slug
    router.push(`/courses/${courseSlug}/${level.value}/${prevSlug}`)
  }
}

function goToNextLesson() {
  const idx = lessonsInLevel.value.findIndex(l => l.slug === lessonSlug)
  if (idx < lessonsInLevel.value.length - 1) {
    const nextSlug = lessonsInLevel.value[idx + 1].slug
    router.push(`/courses/${courseSlug}/${level.value}/${nextSlug}`)
  }
}

// Reactive state for bookmark
const isBookmarked = ref(false)

function toggleBookmark() {
  isBookmarked.value = !isBookmarked.value
}

// Reactive state for video playback
const isPlaying = ref(false)

function onVideoProgress({ currentTime, duration }: { currentTime: number, duration: number }) {
  if (!currentPart.value) return

  const progressPercent = (currentTime / duration) * 100
  const part = lessonParts.value.find(p => p.id === currentPart.value.id)
  if (part && progressPercent > part.progress) {
    part.progress = progressPercent
  }
}

// Computed properties for lesson navigation
const currentLessonIndex = computed(() =>
  lessonsInLevel.value.findIndex(l => l.slug === lessonSlug)
)

const hasPreviousLesson = computed(() =>
  currentLessonIndex.value > 0
)

const hasNextLesson = computed(() =>
  currentLessonIndex.value < lessonsInLevel.value.length - 1
)
</script>

<template>
  <div class="px-4 sm:px-2 py-16 max-w-screen-xl mx-auto" v-if="lesson">
    <!-- Top section with lesson title and bookmark button -->
    <div class="mb-12">
      <div class="flex items-start justify-between w-full gap-2 mb-5">
        <h1 class="text-[24px] sm:text-[40px] max-w-screen-lg font-semibold leading-tight">
          {{ lesson?.title }}
        </h1>
        <button @click="toggleBookmark"
          class="w-6 h-6 text-gray-600 hover:text-black p-0 m-0 leading-none flex items-start justify-center">
          <Icon :name="isBookmarked ? 'bookmark' : 'bookmark-outline'" class="w-6 h-6" />
        </button>
      </div>
      <p class="text-sm sm:text-base text-gray-500 mt-2">
        {{ lessonComponentCount }} Lesson Components • 3 Video Exchanges • 3 Study Materials
      </p>
    </div>

    <!-- Video Player -->
    <VideoPlayer :src="currentPart.videoUrl" :isPlaying="isPlaying" :initialProgress="currentPart.progress"
      @update:isPlaying="isPlaying = $event" @progress="onVideoProgress" />

    <!-- Lesson Tabs -->
    <LessonTabs v-model="activeTab" class="mt-10" />

    <!-- Lesson Tab components -->
    <div class="mt-6">
      <template v-if="activeTab === 'components'">
        <div class="space-y-2">
          <LessonPartItem v-for="(part, index) in lessonPartsForLesson" :key="part.id" :part="part" :lesson="lesson!"
            :index="index + 1" :active="part.id === currentPart.id" :isCurrent="part.id === currentPart.id"
            :isPlaying="part.id === currentPart.id && isPlaying" :onPlay="() => {
              if (part.id !== currentPart.id) {
                currentPart = part
              }
              isPlaying = true
            }" @click="currentPart = part" />
        </div>
      </template>

      <template v-else-if="activeTab === 'exchanges'">
        <div class="bg-gray-50 p-6 rounded-lg border text-gray-700">
          <h3 class="text-lg font-medium mb-2">Video Exchanges</h3>
          <p>This is a placeholder for student-instructor video exchanges. You can implement messaging and reply UI
            here.</p>
        </div>
      </template>

      <template v-else-if="activeTab === 'materials'">
        <div class="bg-gray-50 p-6 rounded-lg border text-gray-700">
          <h3 class="text-lg font-medium mb-2">Study Materials</h3>
          <ul class="list-disc pl-5">
            <li>PDF: Sheet Music</li>
            <li>Practice Guidelines</li>
            <li>Reading Assignments</li>
          </ul>
        </div>
      </template>
    </div>

    <!-- Navigation buttons for next/previous lesson -->
    <div class="mt-10 flex justify-between">
      <button @click="goToPreviousLesson" :disabled="!hasPreviousLesson"
        class="border-gray-200 border hover:bg-gray-200 text-sm px-4 py-4 rounded-[100px] disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed">
        Previous Lesson
      </button>

      <button @click="goToNextLesson" :disabled="!hasNextLesson"
        class="border-gray-200 border hover:bg-gray-200 text-sm px-4 py-4 rounded-[100px] disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed">
        Next Lesson
      </button>
    </div>
  </div>
</template>