import {useAuth} from "~/layers/user/composables/useAuth"
export default defineNuxtRouteMiddleware(async (to, _from) => {
    const user = useUser()

    const {me} = useAuth()

    if (!user.value) {
        await me()
    }

    if (!user.value) {
        useCookie('redirect', { path: '/', httpOnly: true, secure: true, sameSite: 'strict' }).value = to.fullPath
        return navigateTo('/sign')
    }
})