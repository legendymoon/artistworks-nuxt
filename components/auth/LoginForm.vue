<template>
    <div class="flex min-h-screen">
        <!-- Left side gradient background -->
        <div class="hidden md:flex w-1/4 text-white relative overflow-hidden"
            style="background: linear-gradient(139.18deg, #1e3a8a 30%, #3b82f6 85%);">
            <div class="text-[52px] font-bold px-[42px] py-[59px] z-10">Welcome<br />Back</div>
            <img src="/images/logo.png" alt="Logo"
                class="absolute bottom-[-150px] left-[-190px] w-[450px] opacity-20 pointer-events-none select-none" />
        </div>

        <!-- Right side login form -->
        <div class="w-full md:w-3/4 flex items-center justify-center px-6 sm:px-8 py-10">
            <div class="w-full max-w-md space-y-6">
                <div class="flex justify-left">
                    <img src="/images/logo.png" alt="Logo" class="h-10" />
                </div>             
                <h2 class="text-left text-2xl font-bold">Sign in to ArtistWorks</h2>

                <p class="text-left text-sm text-gray-500">
                    New user?
                    <a href="#" class="text-blue-700 font-medium hover:underline">Create an account.</a>
                </p>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                        <input v-model="username" id="username" type="text" required placeholder="Enter username"
                            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input v-model="password" id="password" type="password" required placeholder="Enter password"
                            class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <button type="submit"
                        class="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition">
                        Continue
                    </button>

                    <div class="text-sm text-left">
                        <a href="#" class="text-black font-medium hover:underline">Forgot password?</a>
                    </div>
                </form>

                <SocialLogin />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import SocialLogin from '@/components/auth/SocialLogin.vue'

const username = ref('')
const password = ref('')
const { login } = useAuth()
const router = useRouter()

const handleSubmit = () => {
    const success = login(username.value, password.value)
    if (success) {
        router.push('/')
    } else {
        alert('Invalid credentials')
    }
}
</script>
