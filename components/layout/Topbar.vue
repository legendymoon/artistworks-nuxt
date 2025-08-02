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
      
      <div class="hidden lg:flex items-center space-x-2">
        <button
          class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200"
          style="background: var(--ui-light-gray-2-f-6-f-6-f-6, rgba(246, 246, 246, 1));"
        >
          <Icon name="arrow-left" class="text-gray-600" />
        </button>

        <span 
          class="text-sm text-gray-600 font-medium capitalize"
        >
          LESSONS
        </span>

        <span class="text-gray-500 uppercase">Lessons</span>
      </div>
    </div>
    <!-- RIGHT SIDE -->
    <div class="flex items-center space-x-3 relative">
      <!-- Search -->
      <div class="relative hidden lg:block w-64" ref="searchRef">
        <div v-if="!showSearch" @click="activateSearch" class="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm w-full">
          <Icon name="search" />
          Search
        </div>
        <div v-else class="relative w-full">
          <input
            ref="searchInput"
            v-model="searchQuery"
            placeholder="Search..."
            class="w-full px-4 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ul v-if="searchQuery" class="absolute left-0 right-0 mt-1 bg-white border rounded shadow text-sm z-10">
            <li class="px-4 py-2 hover:bg-gray-100">Recent search: "{{ searchQuery }}"</li>
            <li class="px-4 py-2 hover:bg-gray-100">Suggested: Topic A</li>
          </ul>
        </div>
      </div>

      <!-- Notification -->
      <div class="relative" ref="notificationRef">
        <button
          @click="toggleNotifications"
          class="rounded-full bg-gray-100 p-2 hover:bg-gray-200 relative"
        >
          <Icon name="inbox" />
          <span
            class="absolute -top-1 -right-1 bg-fuchsia-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
          >2</span>
        </button>
        <div
          v-if="showNotifications"
          class="absolute z-50 mt-2 bg-white border rounded shadow
                w-72 right-0
                sm:right-0 sm:w-72
                max-sm:left-1/2 max-sm:-translate-x-[40%] max-sm:w-[90vw]"
        >
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
        <button
          class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
        >
          <Icon name="upload" />
          Submit Video
        </button>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useClickOutside } from '@/composables/useClickOutside'
import Icon from '@/components/ui/Icon.vue'
import { useRoute, useRouter } from 'vue-router'

const showNotifications = ref(false)

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

function toggleNotifications() {
  showNotifications.value = !showNotifications.value
}

const notificationRef = ref(null)
useClickOutside(notificationRef, () => {
  showNotifications.value = false
})

</script>