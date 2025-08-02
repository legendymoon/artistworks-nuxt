import { ref, computed } from 'vue'
import { useLessons } from './useLessons'
import { useLessonParts } from './useLessonParts'
import { Course } from '@/types/course'

const courses = ref<Course[]>([
  { id: 0, title: 'Jazz Guitar with Dave Stryker', category: 'Jazz Guitar', instructor: 'Dave Stryker', avatar: 'Dave Stryker.jpg', slug: 'jazz-guitar-lessons-dave-stryker', levels: ['Basic', 'Intermediate', 'Advanced', 'Bonus Lessons'] },
  { id: 1, title: 'Banjo with Noam Pikelny', category: 'Banjo', instructor: 'Noam Pikelny', avatar: 'Noam Pikelny.jpg', slug: 'banjo-lessons-noam-pikelny', levels: ['Basic', 'Intermediate', 'Advanced']},
  { id: 2, title: 'Paul Gilbert Guitar Lessons', category: 'Guitar', instructor: 'Paul Gilbert', avatar: 'Paul Gilbert.jpg', slug: 'guitar-lessons-paul-gilbert', levels: ['Fundamentals', 'Intermediate', 'Advanced', '30 Day Challenge']}
])

export function useCourses() {
  const { lessons } = useLessons()
  const { lessonParts } = useLessonParts()

  const courseStats = computed(() =>
    courses.value.map((course) => {
      const courseLessons = lessons.value.filter(l => l.courseId === course.id)
      const totalParts = courseLessons.reduce(
        (sum, lesson) => sum + lessonParts.value.filter(p => p.lessonId === lesson.id).length,
        0
      )
      return { ...course, lessonCount: courseLessons.length, partCount: totalParts }
    })
  )

  return { courses, courseStats }
}
