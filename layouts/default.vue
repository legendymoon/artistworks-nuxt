<template>
  <div class="flex h-screen overflow-hidden">
    <div class="flex-1 flex flex-col">
      <Topbar/>
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Topbar from '~/components/layout/Topbar.vue'

const route = useRoute()

const isLoginPage = computed(() => route.path === '/login')
</script>