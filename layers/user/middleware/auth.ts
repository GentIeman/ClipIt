export default defineNuxtRouteMiddleware(async (to, _from) => {
    const user = useUser()

    if (!user.value) {
        useCookie('redirect', { path: '/', httpOnly: true, secure: true, sameSite: 'strict' }).value = to.fullPath
        return navigateTo('/sign')
    }
})