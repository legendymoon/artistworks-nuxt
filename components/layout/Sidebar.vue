<template>
  <aside class="bg-[#022040] text-white flex flex-col
           fixed inset-y-0 left-0 z-50
           transform transition-transform duration-300 ease-in-out
           lg:translate-x-0 lg:static
           h-screen transition-width duration-300"
    :class="[!show ? '-translate-x-full' : '', collapsed ? 'w-20' : 'w-64']">
    <!-- Logo -->
    <div class="flex items-center mx-4 h-20">
      <RouterLink to="/">
        <img src="/images/logo-white.png" alt="Logo" class="h-10 cursor-pointer" />
      </RouterLink>
    </div>

    <!-- Course Dropdown -->
    <div class="relative mx-4 mt-4 border border-[#1f3a5f] rounded-lg p-3" v-if="!collapsed" ref="courseDropdownRef">
      <button class="flex items-center gap-3 w-full text-left" @click="showCourseDropdown = !showCourseDropdown">
        <img :src="`/images/${currentCourse?.avatar}`" :alt="currentCourse?.instructor" class="w-12 h-12 rounded-lg" />
        <div class="flex flex-col">
          <span class="text-sm font-medium leading-tight">{{ currentCourse?.category }} with</span>
          <span class="text-sm font-medium leading-tight">{{ currentCourse?.instructor }}</span>
        </div>
        <Icon name="chevrons-up-down" class="ml-auto text-gray-400" />
      </button>
      <!-- Course Dropdown Menu -->
      <div v-if="showCourseDropdown"
        class="absolute left-0 right-0 mt-2 bg-[#01142c] border border-[#1f3a5f] rounded-lg shadow-lg z-30">
        <ul>
          <li v-for="course in courses" :key="course.id" @click="selectCourse(course)"
            class="px-4 py-2 hover:bg-[#1f3a5f] cursor-pointer text-sm">
            {{ course.title }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="mt-6 flex-1 p-4 space-y-4" :class="{ 'p-2': collapsed }">
      <div class="space-y-1">
        <SidebarLink icon="home" label="Home" to="/" :collapsed="collapsed" />
        <SidebarLink icon="play" label="Lessons" :to="`/courses/${currentCourseSlug}`" :collapsed="collapsed" />
        <SidebarLink icon="refresh-ccw" label="Video Exchanges" to="/exchanges" :collapsed="collapsed" />
        <SidebarLink icon="book-open" label="Study Materials" to="/materials" :collapsed="collapsed" />
        <SidebarLink icon="bookmark-outline" label="Bookmarks" to="/bookmarks" :collapsed="collapsed" />
        <SidebarLink icon="timer-sand-complete" label="History" to="/history" :collapsed="collapsed" />
      </div>

      <hr class="border-t border-[#1f3a5f]" />

      <div class="space-y-1">
        <SidebarLink icon="metronome" label="Metronome" to="/metronome" :collapsed="collapsed" />
        <SidebarLink icon="music" label="Scale Browser" to="/scales" :collapsed="collapsed" />
      </div>

      <hr class="border-t border-[#1f3a5f]" />

      <div class="space-y-1">
        <SidebarLink icon="globe" label="Community" to="/community" :collapsed="collapsed" />
      </div>
    </nav>

    <!-- My Account & Collapse -->
    <div class="px-4 pb-6 mt-auto relative" :class="{ 'flex justify-center': collapsed }" ref="dropdownRef">
      <!-- Dropdown Menu -->
      <div v-if="showAccountDropdown && !collapsed"
        class="absolute bottom-14 left-4 right-4 bg-[#01142c] border border-[#1f3a5f] rounded-lg shadow-lg z-20">
        <RouterLink to="/my-account" class="block px-4 py-2 text-sm hover:bg-[#1f3a5f] text-white">
          My Profile
        </RouterLink>
        <button class="w-full text-left px-4 py-2 text-sm hover:bg-[#1f3a5f] text-white" @click="handleSignOut">
          Sign Out
        </button>
      </div>

      <!-- Expanded -->
      <div class="flex items-center justify-between w-full" v-if="!collapsed">
        <button class="flex items-center gap-2 text-white hover:text-gray-400"
          @click="showAccountDropdown = !showAccountDropdown">
          <Icon name="user-circle" />
          <span class="text-sm font-medium">My Account</span>
        </button>
        <button @click="emit('toggleCollapse')" class="text-white p-2 hover:text-gray-400">
          <Icon :name="collapsed ? 'chevrons-right' : 'chevrons-left'" />
        </button>
      </div>

      <!-- Collapsed -->
      <div v-else class="flex flex-col items-center space-y-2">
        <button @click="showAccountDropdown = !showAccountDropdown" class="text-white hover:text-gray-400">
          <Icon name="user-circle" />
        </button>
        <button @click="emit('toggleCollapse')" class="text-white hover:text-gray-400">
          <Icon :name="collapsed ? 'chevrons-right' : 'chevrons-left'" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useClickOutside } from '@/composables/useClickOutside'
import { useCourses } from '@/composables/useCourses'
import { useCurrentCourse } from '@/composables/useCurrentCourse'
import { Course } from '@/types/course'
import SidebarLink from '@/components/layout/SidebarLink.vue'
import Icon from '@/components/ui/Icon.vue'

// Props and Emits
const router = useRouter()
const props = defineProps<{ show: boolean; collapsed: boolean }>()
const emit = defineEmits(['toggleCollapse', 'close'])

// Refs
const showCourseDropdown = ref(false)
const courseDropdownRef = ref(null)
const showAccountDropdown = ref(false)
const dropdownRef = ref(null)

// Handle Sign Out
const { logout } = useAuth()

function handleSignOut() {
  logout()
  router.push('/login')
}

useClickOutside(dropdownRef, () => {
  showAccountDropdown.value = false
})

// Course Dropdown
const { courses } = useCourses()
const { currentCourseSlug } = useCurrentCourse()
const currentCourse = computed(() =>
  courses.value.find(c => c.slug === currentCourseSlug.value)
)

useClickOutside(courseDropdownRef, () => {
  showCourseDropdown.value = false
})

function selectCourse(course: Course) {
  showCourseDropdown.value = false
  router.push(`/courses/${course.slug}`)
}
</script>
