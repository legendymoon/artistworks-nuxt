<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/auth/LoginForm.vue'

definePageMeta({
  middleware: ['redirect-if-logged-in'],
})
</script>

<template>
  <LoginForm />
</template>