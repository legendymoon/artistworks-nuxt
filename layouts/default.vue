<template>
  <div class="flex h-screen overflow-hidden">
    <div class="flex-1 flex flex-col">
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

</script>