<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar
      v-if="!isLoginPage"
      :show="sidebarVisible"
      :collapsed="sidebarCollapsed"
      @close="sidebarVisible = false"
      @toggleCollapse="sidebarCollapsed = !sidebarCollapsed"
    />

    <div
      v-if="sidebarVisible"
      class="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
      @click="sidebarVisible = false"
    ></div>

    <div class="flex-1 flex flex-col">
      <Topbar v-if="!isLoginPage" @toggleSidebar="sidebarVisible = !sidebarVisible" />
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '~/components/layout/Sidebar.vue'
import Topbar from '~/components/layout/Topbar.vue'

const sidebarVisible = ref(false)
const sidebarCollapsed = ref(false)

const route = useRoute()

const isLoginPage = computed(() => route.path === '/login')
</script>