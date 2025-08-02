export default defineNuxtRouteMiddleware((to) => {
  const publicPages = ['/', '/login']
  const isPublic = publicPages.includes(to.path)

  const token = useCookie('auth_token')

  if (!token.value && !isPublic) {
    return navigateTo('/login')
  }

  if (token.value && to.path === '/login') {
    return navigateTo('/')
  }
})