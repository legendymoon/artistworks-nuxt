<template>
  <component :is="to ? 'router-link' : 'div'" v-bind="to ? { to } : {}"
    class="flex items-center gap-3 px-2 py-2 rounded-lg transition cursor-pointer" :class="[
      !noMargin ? 'mb-1' : '',
      isActive ? 'bg-white/20' : 'hover:bg-[#1b395f]',
      collapsed ? 'justify-center' : ''
    ]">
    <Icon :name="icon as any" class="w-5 h-5" />
    <span v-if="!collapsed" class="text-sm font-medium transition-all duration-200">
      {{ label }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '@/components/ui/Icon.vue'

const props = defineProps<{
  icon: string
  label: string
  to?: string
  noMargin?: boolean
  collapsed?: boolean
}>()

const route = useRoute()

const isActive = computed(() => {
  return route.path === props.to || route.path.startsWith(props.to + '/')
})
</script>
