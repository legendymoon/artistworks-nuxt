export default defineNuxtConfig({

    typescript: {
        typeCheck: true,
        strict: true,
    },
    
    css: ['~/assets/css/main.css'],

    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },

    runtimeConfig: {
        public: {
            videoBaseUrl: process.env.NUXT_PUBLIC_VIDEO_BASE_URL
        }
    },
})
