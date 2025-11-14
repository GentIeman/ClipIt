import {getCookie} from "h3";
import type {User} from "~/layers/user/composables/useUser"

export type Response = {
    user: User
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const token = getCookie(event, "strapi_jwt")

    const user =  await $fetch<Response>(config.public.strapiOrigin + "/api/users/me", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    return {user}
})