<template>
  <header class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
    <!-- LEFT SIDE -->
    <div class="flex items-center space-x-3">
      <!-- Mobile: Hamburger -->
      <button class="lg:hidden" @click="$emit('toggleSidebar')">
        <Icon name="menu" />
      </button>

      <!-- Mobile: Logo -->
      <RouterLink to="/" class="lg:hidden">
        <img src="/images/logo.png" alt="Logo" class="h-6" />
      </RouterLink>

      <div v-if="showBackButton" class="hidden lg:flex items-center space-x-2">
        <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200" @click="goBack"
          style="background: var(--ui-light-gray-2-f-6-f-6-f-6, rgba(246, 246, 246, 1));">
          <Icon name="arrow-left" class="text-gray-600" />
        </button>

        <span v-if="isLevelPage" class="text-sm text-gray-600 font-medium capitalize">
          LESSONS
        </span>

        <span v-else-if="isLessonPage" class="flex items-center text-sm font-medium">
          <span class="text-gray-500 uppercase">Lessons</span>
          <span class="mx-1">/</span>
          <span class="text-black uppercase">{{ levelLabel }}</span>
        </span>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="flex items-center space-x-3 relative">
      <!-- Search -->
      <div class="relative hidden lg:block w-64" ref="searchRef">
        <div v-if="!showSearch" @click="activateSearch"
          class="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm w-full">
          <Icon name="search" />
          Search
        </div>
        <div v-else class="relative w-full">
          <input ref="searchInput" v-model="searchQuery" placeholder="Search..."
            class="w-full px-4 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <ul v-if="searchQuery" class="absolute left-0 right-0 mt-1 bg-white border rounded shadow text-sm z-10">
            <li class="px-4 py-2 hover:bg-gray-100">Recent search: "{{ searchQuery }}"</li>
            <li class="px-4 py-2 hover:bg-gray-100">Suggested: Topic A</li>
          </ul>
        </div>
      </div>

      <!-- Notification -->
      <div class="relative" ref="notificationRef">
        <button @click="toggleNotifications" class="rounded-full bg-gray-100 p-2 hover:bg-gray-200 relative">
          <Icon name="inbox" />
          <span
            class="absolute -top-1 -right-1 bg-fuchsia-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
        </button>
        <div v-if="showNotifications" class="absolute z-50 mt-2 bg-white border rounded shadow
                w-72 right-0
                sm:right-0 sm:w-72
                max-sm:left-1/2 max-sm:-translate-x-[40%] max-sm:w-[90vw]">
          <div class="px-4 py-2 text-sm border-b font-semibold">Notifications</div>
          <div class="px-4 py-3 flex items-start gap-2 text-sm">
            <Icon name="info" class="text-blue-500 mt-0.5" />
            <div>Welcome back! You have new lessons available.</div>
          </div>
          <div class="px-4 py-3 flex items-start gap-2 text-sm">
            <Icon name="alert-triangle" class="text-yellow-500 mt-0.5" />
            <div>Your subscription will expire in 3 days.</div>
          </div>
        </div>
      </div>

      <!-- Submit Video Button -->
      <div>
        <button class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
          @click="showModal = true">
          <Icon name="upload" />
          Submit Video
        </button>
      </div>

    </div>
  </header>

  <!-- Overlay -->
  <div v-if="showOverlay" class="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg text-center">
      <h3 class="text-lg font-semibold mb-4">Uploading Video...</h3>
      <button @click="showOverlay = false" class="mt-2 text-blue-500 hover:underline">Close</button>
    </div>
  </div>

  <!-- Video Upload Modal -->
  <Modal v-if="showModal" @close="showModal = false">
    <div
      class="flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 hover:border-blue-400 transition duration-300"
      @dragover.prevent @drop.prevent="handleDrop">
      <Icon name="upload-cloud" class="text-5xl text-blue-500 mb-4" />

      <h2 class="text-lg font-semibold text-gray-700">Upload Your Video</h2>
      <p class="text-sm text-gray-500 mb-4">
        Drag and drop your video file here or click the button below to browse.
      </p>

      <!-- Accepted Formats -->
      <p class="text-xs text-gray-400 mb-2">
        Accepted formats: <span class="font-medium text-gray-600">.mp4, .mov, .webm, .avi</span>
      </p>

      <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm"
        @click="fileInput?.click()">
        Select Video File
      </button>

      <input ref="fileInput" type="file" class="hidden" accept="video/mp4,video/mov,video/webm,video/avi"
        @change="handleFileUpload" />
    </div>
  </Modal>

</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClickOutside } from '@/composables/useClickOutside'
import Icon from '@/components/ui/Icon.vue'
import Modal from '@/components/ui/Modal.vue'
const route = useRoute()
const router = useRouter()

// Current Page Extraction
const segments = computed(() =>
  route.path.split('/').filter(Boolean)
)

const showBackButton = computed(() => segments.value.length >= 3)

const isLevelPage = computed(() =>
  segments.value.length === 3 &&
  segments.value[0] === 'courses'
)

const isLessonPage = computed(() =>
  segments.value.length > 3 &&
  segments.value[0] === 'courses'
)

const levelLabel = computed(() => {
  const lvl = (route.params.level as string | undefined) || ''
  return lvl.replace(/-/g, ' ').toUpperCase()
})

// Go Back Function
function goBack() {
  const parts = route.path.split('/').filter(Boolean)

  if (parts.length <= 1) {
    router.push('/')
    return
  }

  parts.pop()
  router.push(`/${parts.join('/')}`)
}

// Search
const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

function activateSearch(e?: MouseEvent) {
  e?.stopPropagation()
  showSearch.value = true
  nextTick(() => {
    searchInput.value?.focus()
  })
}

const searchRef = ref<HTMLElement | null>(null)
useClickOutside(searchRef, () => {
  showSearch.value = false
})

// Notifications
const showNotifications = ref(false)
const notificationRef = ref(null)
function toggleNotifications() {
  showNotifications.value = !showNotifications.value
}
useClickOutside(notificationRef, () => {
  showNotifications.value = false
})

// Handle Drag and Drop
const showOverlay = ref(false)
const showModal = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const acceptedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']

function handleDrop(e: DragEvent) {
  const file = e.dataTransfer?.files?.[0]
  if (file) validateAndUpload(file)
}

function handleFileUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) validateAndUpload(file)
}

function validateAndUpload(file: File) {
  if (!acceptedTypes.includes(file.type)) {
    alert('Invalid file type. Please upload a valid video file (.mp4, .mov, .webm, .avi).')
    return
  }

  showModal.value = false
  alert(`Uploading: ${file.name}`)

}
</script>