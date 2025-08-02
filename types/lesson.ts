export interface Lesson {
  id: number
  courseId: number
  title: string
  slug: string
  thumbnail: string
  updatedAt: string
  level: 'basic' | 'intermediate' | 'advanced' | 'bonus'
  views: number
}