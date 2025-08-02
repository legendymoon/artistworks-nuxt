<template>
  <component
    :is="iconComponent"
    class="w-5 h-5 inline-block"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Grid2x2,
  LayoutList,
  RefreshCcw,
  CloudUpload,
  BookOpen,
  Check,
  Music,
  CirclePlay,
  Globe,
  UserCircle,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronDown,
  Home,
  Menu,
  Search,
  ArrowLeft,
  Upload,
  Inbox,
  TriangleAlert,
  Info,
  X,
} from 'lucide-vue-next'

import Metronome from 'vue-material-design-icons/Metronome.vue'
import DotsGrid from 'vue-material-design-icons/DotsGrid.vue'
import Bookmark from 'vue-material-design-icons/Bookmark.vue'
import CheckCircleOutline from 'vue-material-design-icons/CheckCircleOutline.vue'
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue'
import BookmarkOutline from 'vue-material-design-icons/BookmarkOutline.vue'
import TimerSandComplete from 'vue-material-design-icons/TimerSandComplete.vue'

const iconMap = {
  'grid-compact': Grid2x2,
  grid: DotsGrid,
  list: LayoutList,
  bookmark: Bookmark,
  'bookmark-outline': BookmarkOutline,
  check: Check,
  'check-circle': CheckCircle,
  'check-circle-outline': CheckCircleOutline,
  play:CirclePlay,
  'refresh-ccw': RefreshCcw,
  'book-open': BookOpen,
  'timer-sand-complete': TimerSandComplete,
  music: Music,
  globe: Globe,
  'user-circle': UserCircle,
  'chevrons-left': ChevronsLeft,
  'chevrons-right': ChevronsRight,
  'chevrons-up-down': ChevronsUpDown,
  'chevrons-down': ChevronDown,
  home: Home,
  menu: Menu,
  metronome: Metronome,
  search: Search,
  'arrow-left': ArrowLeft,
  upload: Upload,
  'upload-cloud': CloudUpload,
  inbox: Inbox,
  'alert-triangle': TriangleAlert,
  info: Info,
  x: X,
} as const

type IconName = keyof typeof iconMap

const props = defineProps<{
  name: IconName
}>()

const iconComponent = computed(() => iconMap[props.name] || 'span')
</script>
