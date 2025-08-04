<template>
  <div class="space-y-4">
    <div class="relative text-center">
      <span class="text-gray-400 text-sm">Or sign in with</span>
      <div class="absolute left-0 right-0 top-1/2 h-px bg-gray-200 z-0"></div>
    </div>

    <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
      <!-- Google Sign In -->
      <button
        class="flex-1 border rounded-lg py-2 flex items-center justify-center space-x-2 hover:bg-gray-100 transition">
        <img src="/icons/google.svg" alt="Google" class="h-5" />
        <span>Google</span>
      </button>

      <!-- Apple Sign In -->
      <button
        class="flex-1 border rounded-lg py-2 flex items-center justify-center space-x-2 hover:bg-gray-100 transition">
        <img src="/icons/apple.svg" alt="Apple" class="h-5" />
        <span>Apple</span>
      </button>
    </div>
  </div>
</template>