<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
const { isAuthenticated } = useAuth()

if (process.client) {
  navigateTo(isAuthenticated.value ? '/' : '/login')
}
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <p>Main Page</p>
  </div>
</template>