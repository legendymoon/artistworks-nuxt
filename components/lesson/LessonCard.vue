<template>
  <div
    class="relative border rounded-[12px] overflow-hidden shadow-sm bg-white transition hover:shadow-md group cursor-pointer"
    @click="handleCardClick">
    <div :class="view === 'list' ? 'flex gap-4' : 'min-h-[190px] sm:min-h-0'">
      <!-- Thumbnail -->
      <div :class="view !== 'list' ? 'h-32 w-full' : 'mt-3 ml-4 h-20 w-32'" class="relative">
        <img :src="lesson.thumbnail" alt="Thumbnail" class="rounded-[5px] object-cover w-full h-full" />
        <div v-if="lesson.progress >= 100" class="absolute inset-0 bg-black bg-opacity-70 z-10 rounded-[5px]"></div>
        <div v-if="lesson.progress >= 100" class="absolute inset-0 flex items-center justify-center z-20">
          <div class="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
            <Icon name="check" class="text-blue-600 w-4 h-4" />
          </div>
        </div>
      </div>

      <div class="p-4 flex-1">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <h2 class="font-semibold text-[14px] mb-1 line-clamp-2 mt-1 sm:mt-0">
            {{ lesson.title }}
          </h2>
          <!-- Buttons -->
          <div class="hidden sm:flex gap-2">
            <button @click.stop="toggleBookmark" class="text-[20px]">
              <Icon :name="isBookmarked ? 'bookmark' : 'bookmark-outline'" />
            </button>
            <button @click.stop="toggleCheck">
              <Icon :name="isChecked ? 'check-circle' : 'check-circle-outline'" />
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-500">Lesson</p>
      </div>
    </div>

    <div class="px-4 pb-4 pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <!-- Progress -->
      <LessonProgress :progress="lesson.progress" class="flex-1" />
      
      <!-- Duration -->
      <span class="text-[#595959] text-xs px-2 py-0.5 rounded whitespace-nowrap hidden sm:inline">
        {{ formattedDuration }}
      </span>
      
      <!-- Mobile Buttons -->
      <div class="flex justify-end gap-8 sm:gap-2 sm:hidden">
        <button @click.stop="toggleBookmark">
          <Icon :name="isBookmarked ? 'bookmark' : 'bookmark-outline'" />
        </button>
        <button @click.stop="toggleCheck">
          <Icon :name="isChecked ? 'check-circle' : 'check-circle-outline'" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatSecondsToTime } from '@/utils/formatTime'
import LessonProgress from './LessonProgress.vue'
import Icon from '@/components/ui/Icon.vue'

const router = useRouter()
const emit = defineEmits(['updateLessonProgress'])
const props = defineProps<{
  lesson: any
  view: 'list' | 'compact' | 'large'
  courseSlug: string
  level: string
}>()

const lesson = ref({ ...props.lesson })

const isBookmarked = ref(false)
function toggleBookmark() {
  isBookmarked.value = !isBookmarked.value
}

const isChecked = computed(() => lesson.value.progress >= 100)
function toggleCheck() {
  if (!isChecked.value) {
    emit('updateLessonProgress', {
      id: props.lesson.id
    })
    lesson.value.progress = 100
  }
}

const isGrid = computed(() => props.view !== 'list')
const formattedDuration = computed(() => formatSecondsToTime(lesson.value.duration))

function handleCardClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.closest('button')) return
  router.push(`/courses/${props.courseSlug}/${props.level}/${lesson.value.slug}`)
}

</script>