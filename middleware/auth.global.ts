export default defineNuxtRouteMiddleware((to) => {
  const publicPages = ['/login']
  const isPublic = publicPages.includes(to.path)
  const token = useCookie('auth_token')

  // Redirect to login if not authenticated and trying to access a protected route
  if (!token.value && !isPublic) {
    return navigateTo('/login')
  }

  // Redirect to home if authenticated and trying to access login page
  if (token.value && to.path === '/login') {
    return navigateTo('/')
  }

  // Redirect to login if visiting the root route and not authenticated
  if (!token.value && to.path === '/') {
    return navigateTo('/login')
  }
})