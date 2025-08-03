<template>
    <div class="px-2 sm:px-10 pt-14 min-h-full">
        <h1 class="text-[44px] sm:text-[56px] font-bold mb-4">{{ level.charAt(0).toUpperCase() + level.slice(1) }}</h1>
        <div class="text-[12px] sm:text-[22px] text-gray-600 mb-8">
            <span>{{ totalLessons  }} Topics</span>
            <span class="mx-1 sm:mx-2">•</span>
            <span>{{ totalLessonParts }} Lesson Videos</span>
            <span class="mx-1 sm:mx-2">•</span>
            <span>1673 Video Exchanges</span>
        </div>

        <!-- Controls -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-10">
            <!-- Left-aligned group: Search and Sort -->
            <div class="flex items-center gap-2 flex-wrap">
                <!-- Search -->
                <div class="relative block w-[140px] md:w-[200px]" ref="searchRef">
                    <div v-if="!showSearch" @click="activateSearch"
                        class="cursor-pointer flex items-center gap-2 px-3 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-sm w-full">
                        <Icon name="search" />
                        <span>Search</span>
                    </div>
                    <div v-else class="relative w-full">
                        <input ref="searchInput" v-model="searchQuery" placeholder="Search..."
                            class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <!-- Sort -->
                <div class="relative" ref="sortRef">
                    <div @click="toggleSortDropdown"
                        class="cursor-pointer flex items-center gap-2 px-4 py-3 border rounded-full bg-white hover:bg-gray-100 text-sm justify-between">
                        <span class="truncate">{{ selectedSort }}</span>
                        <Icon name="chevrons-down" />
                    </div>

                    <div v-if="showSortDropdown"
                        class="absolute z-50 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-48">
                        <ul>
                            <li v-for="option in sortOptions" :key="option" @click="selectSort(option)"
                                class="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                :class="{ 'font-semibold text-blue-600': selectedSort === option }">
                                {{ option }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Right-aligned View Toggle -->
            <div class="flex items-center gap-2">
                <span class="text-sm text-black-600 hidden md:inline">View</span>
                <button v-for="option in viewModes" :key="option" v-show="option !== 'large' || isDesktop"
                    @click="toggleView(option)"
                    :class="['w-10 h-10 flex items-center justify-center rounded-full border transition hover:bg-gray-100', view === option ? 'bg-white-100' : 'border-transparent']"
                    :style="view === option ? 'border: 1px solid var(--ui-light-gray-1-ebebeb, rgba(235, 235, 235, 1))' : ''">
                    <Icon :name="getIconForView(option)" />
                </button>
            </div>
        </div>

        <LessonList :lessons="decoratedLessons" :view="view" :courseSlug="courseSlug" :level="level"
            @updateLessonProgress="handleProgressUpdate" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useCourses } from '@/composables/useCourses'
import { useLessons } from '@/composables/useLessons'
import { useLessonParts } from '@/composables/useLessonParts'
import Icon from '@/components/ui/Icon.vue'
import LessonList from '@/components/lesson/LessonList.vue'

const route = useRoute()
const { lessons } = useLessons()
const { courses } = useCourses()

const { lessonParts } = useLessonParts()
const courseSlug = computed(() => route.params.courseSlug as string)
const level = computed(() => route.params.level as string)

const course = computed(() =>
    courses.value.find(c => c.slug === courseSlug.value)
)

const lessonsInLevel = computed(() =>
    lessons.value.filter(
        l => l.courseId === course.value?.id &&
            l.level === level.value
    )
)

const lessonPartsInLevel = computed(() =>
    lessonParts.value.filter(
        p => lessonsInLevel.value.some(l => l.id === p.lessonId)
    )
)

const totalLessons = computed(() => lessonsInLevel.value.length)
const totalLessonParts = computed(() => lessonPartsInLevel.value.length)

const showSearch = ref(false)
const searchQuery = ref('')
const sortOptions = ['A-Z', 'Z-A', 'Most Recent', 'Most Viewed', 'Completed']
const selectedSort = ref('Sort')
const showSortDropdown = ref(false)
const sortRef = ref(null)

function toggleSortDropdown(e?: MouseEvent) {
    e?.stopPropagation()
    showSortDropdown.value = !showSortDropdown.value
}

function selectSort(option: string) {
    selectedSort.value = option
    showSortDropdown.value = false
}

onMounted(() => {
    document.addEventListener('click', (e) => {
        if (sortRef.value && !(sortRef.value as HTMLElement).contains(e.target as Node)) {
            showSortDropdown.value = false
        }
    })
})

const searchInput = ref<HTMLInputElement | null>(null)

const viewModes = ['list', 'compact', 'large'] as const
type ViewMode = typeof viewModes[number]
const view = ref<ViewMode>('list')

const isDesktop = ref(true)
onMounted(() => {
    isDesktop.value = window.innerWidth >= 1024
    window.addEventListener('resize', () => {
        isDesktop.value = window.innerWidth >= 1024
    })
})

const toggleView = (mode: ViewMode) => {
    view.value = mode
}

const getIconForView = (mode: ViewMode) => {
    switch (mode) {
        case 'list':
            return 'list'
        case 'compact':
            return 'grid-compact'
        case 'large':
            return 'grid'
    }
}


function activateSearch(e?: MouseEvent) {
    e?.stopPropagation()
    showSearch.value = true
    nextTick(() => {
        searchInput.value?.focus()
    })
}

function calculateLessonDuration(lessonId: number): number {
    const parts = lessonParts.value.filter((p) => p.lessonId === lessonId)
    return parts.reduce((sum, p) => sum + p.duration, 0)
}

function calculateLessonProgress(lessonId: number): number {
    const parts = lessonParts.value.filter((p) => p.lessonId === lessonId)
    const totalDuration = parts.reduce((sum, p) => sum + p.duration, 0)
    const totalWatched = parts.reduce((sum, p) => sum + (p.duration * p.progress / 100), 0)
    return totalDuration === 0 ? 0 : Math.floor((totalWatched / totalDuration) * 100)
}

function isLessonCompleted(lessonId: number): boolean {
    return calculateLessonProgress(lessonId) === 100
}

const filteredLessons = computed(() => {
  let filtered = lessonsInLevel.value.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  const sorted = [...filtered] // ← make a shallow copy

  switch (selectedSort.value) {
    case 'A-Z':
      sorted.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'Z-A':
      sorted.sort((a, b) => b.title.localeCompare(a.title))
      break
    case 'Most Recent':
      sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      break
    case 'Most Viewed':
      sorted.sort((a, b) => (b.views || 0) - (a.views || 0))
      break
    case 'Completed':
      sorted.sort((a, b) =>
        Number(calculateLessonProgress(b.id)) - Number(calculateLessonProgress(a.id))
      )
      break
  }

  return sorted
})


function handleProgressUpdate({ id: lessonId }: { id: number }) {
    lessonParts.value
        .filter((p) => p.lessonId === lessonId)
        .forEach((p) => {
            p.progress = 100
        })
}

const decoratedLessons = computed(() =>
    filteredLessons.value.map((lesson) => ({
        ...lesson,
        duration: calculateLessonDuration(lesson.id),
        progress: calculateLessonProgress(lesson.id),
        completed: isLessonCompleted(lesson.id)
    }))
)

</script>
