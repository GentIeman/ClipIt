export default defineNuxtPlugin(async () => {
    const user = useUser()
    const { me } = useAuth()

    if (!user.value) {
        await me()
    }
})