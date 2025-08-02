import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
import { LessonPart } from '@/types/lessonPart'

export function useLessonParts() {
  const BASE_URL = useRuntimeConfig().public.videoBaseUrl

  const lessonParts = ref<LessonPart[]>([
    { id: 0, lessonId: 15, duration: 320, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-1.mp4` },
    { id: 1, lessonId: 15, duration: 345, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-2.mp4` },
    { id: 2, lessonId: 15, duration: 378, progress: 42, videoUrl: `${BASE_URL}/lesson-1/part-3.mp4` },
    { id: 3, lessonId: 15, duration: 320, progress: 0, videoUrl: `${BASE_URL}/lesson-1/part-4.mp4` },

    { id: 4, lessonId: 16, duration: 310, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-1.mp4` },
    { id: 5, lessonId: 16, duration: 350, progress: 25, videoUrl: `${BASE_URL}/lesson-1/part-2.mp4` },
    { id: 6, lessonId: 16, duration: 355, progress: 0, videoUrl: `${BASE_URL}/lesson-1/part-3.mp4` },
    { id: 7, lessonId: 16, duration: 340, progress: 0, videoUrl: `${BASE_URL}/lesson-1/part-4.mp4` },

    { id: 8, lessonId: 17, duration: 330, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-1.mp4` },
    { id: 9, lessonId: 17, duration: 330, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-2.mp4` },
    { id: 10, lessonId: 17, duration: 330, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-3.mp4` },
    { id: 11, lessonId: 17, duration: 330, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-4.mp4` },
    { id: 12, lessonId: 17, duration: 330, progress: 78, videoUrl: `${BASE_URL}/lesson-1/part-5.mp4` },

    { id: 13, lessonId: 18, duration: 310, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-1.mp4` },
    { id: 14, lessonId: 18, duration: 340, progress: 35, videoUrl: `${BASE_URL}/lesson-1/part-2.mp4` },
    { id: 15, lessonId: 18, duration: 320, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-3.mp4` },
    { id: 16, lessonId: 18, duration: 360, progress: 42, videoUrl: `${BASE_URL}/lesson-1/part-4.mp4` },

    { id: 17, lessonId: 19, duration: 300, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-1.mp4` },
    { id: 18, lessonId: 19, duration: 335, progress: 24, videoUrl: `${BASE_URL}/lesson-1/part-2.mp4` },
    { id: 19, lessonId: 19, duration: 355, progress: 35, videoUrl: `${BASE_URL}/lesson-1/part-3.mp4` },
    { id: 20, lessonId: 19, duration: 340, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-4.mp4` },

    { id: 21, lessonId: 20, duration: 310, progress: 34, videoUrl: `${BASE_URL}/lesson-1/part-1.mp4` },
    { id: 22, lessonId: 20, duration: 330, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-2.mp4` },
    { id: 23, lessonId: 20, duration: 345, progress: 45, videoUrl: `${BASE_URL}/lesson-1/part-3.mp4` },
    { id: 24, lessonId: 20, duration: 350, progress: 100, videoUrl: `${BASE_URL}/lesson-1/part-4.mp4` },
    { id: 25, lessonId: 20, duration: 360, progress: 22, videoUrl: `${BASE_URL}/lesson-1/part-5.mp4` },
  ])

  return { lessonParts }
}