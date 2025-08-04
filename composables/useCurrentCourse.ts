import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const lastCourseSlug = ref<string | null>(null)

// Composable to manage the current course based on route parameters
export function useCurrentCourse() {
  const route = useRoute()

  watch(
    () => route.params.courseSlug as string | undefined,
    newSlug => {
      if (newSlug) lastCourseSlug.value = newSlug
    },
    { immediate: true }
  )

  const currentCourseSlug = computed(() => {
    return (route.params.courseSlug as string) || lastCourseSlug.value
  })

  return { currentCourseSlug }
}
