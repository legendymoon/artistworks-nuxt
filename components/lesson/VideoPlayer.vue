<template>
  <div class="relative w-full aspect-video rounded overflow-hidden bg-black group">
    <video ref="videoRef" class="w-full h-full" :src="src" controls @play="emit('update:isPlaying', true)"
      @pause="emit('update:isPlaying', false)" />

    <!-- Play/Pause button overlay -->
    <button v-if="!props.isPlaying" @click="playVideo"
      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-24 h-24">
        <circle cx="24" cy="24" r="24" fill="black" fill-opacity="0.3" />
        <polygon points="19,15 36,24 19,33" fill="white" />
      </svg>
    </button>
    <button v-else @click="pauseVideo" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
             opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-24 h-24">
        <circle cx="24" cy="24" r="24" fill="black" fill-opacity="0.3" />
        <rect x="16" y="15" width="5" height="18" fill="white" />
        <rect x="27" y="15" width="5" height="18" fill="white" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
const videoRef = ref<HTMLVideoElement | null>(null)
const props = defineProps<{
  src: string
  isPlaying: boolean
  initialProgress?: number
}>()

// Interval for tracking video progress
let interval: ReturnType<typeof setInterval> | null = null
const emit = defineEmits(['update:isPlaying', 'progress'])

// Play and Pause functions
function playVideo() {
  videoRef.value?.play()
  emit('update:isPlaying', true)
}

function pauseVideo() {
  videoRef.value?.pause()
  emit('update:isPlaying', false)
}

// Handle video loaded data to set initial progress
function handleLoadedData() {
  if (props.initialProgress && videoRef.value) {
    const duration = videoRef.value.duration
    const resumeTime = (props.initialProgress / 100) * duration
    videoRef.value.currentTime = resumeTime
  }

  if (props.isPlaying) {
    videoRef.value?.play()
  }
}

// Start and stop progress tracking
function startProgressTracking() {
  interval = setInterval(() => {
    if (videoRef.value && props.isPlaying) {
      const currentTime = videoRef.value.currentTime
      const duration = videoRef.value.duration
      emit('progress', { currentTime, duration })
    }
  }, 500)
}

function stopProgressTracking() {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

// Lifecycle hooks to manage video events and progress tracking
onMounted(() => {
  videoRef.value?.addEventListener('loadeddata', handleLoadedData)
  startProgressTracking()
})

onBeforeUnmount(() => {
  videoRef.value?.removeEventListener('loadeddata', handleLoadedData)
  stopProgressTracking()
})

// Watch for changes in isPlaying to start/stop progress tracking
watch(() => props.isPlaying, (val) => {
  if (val) startProgressTracking()
  else stopProgressTracking()
})

watch(() => props.src, () => {
  if (videoRef.value) {
    videoRef.value.currentTime = 0
  }
})
</script>
