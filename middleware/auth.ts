export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useStrapiUser()
    if (!user.value) {
        useCookie('redirect', { path: '/', httpOnly: true, secure: true, sameSite: 'strict' }).value = to.fullPath
        return navigateTo('/sign')
    }
})