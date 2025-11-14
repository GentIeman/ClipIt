import type {Response as LoginResponse} from "~/layers/user/server/api/login.post"
import type {Response as RegisterResponse} from "~/layers/user/server/api/register.post"
import type {Response as MeResponse} from "~/layers/user/server/api/me.get"

export const useAuth = () => {
    const user = useUser();

    const login = async (identifier: string, password: string) => {
        const response = await $fetch<LoginResponse>("/api/login", {
            method: "POST",
            body: {identifier, password},
            // async onResponseError({ response } ) {
            //     console.log(response._data.data.error.status)
            //     console.log(response._data.data.error.message)
            // }
        });

        user.value = response.user
    };

    const register = async (email: string, password: string, username: string) => {
        const response = await $fetch<RegisterResponse>("/api/register", {
            method: "POST",
            body: {email, password, username},
            // async onResponseError({ response } ) {
            //     console.log(response._data.data.error.status)
            //     console.log(response._data.data.error.message)
            // }
        });

        user.value = response.user
    };

    const me = async () => {
        const requestFetch = useRequestFetch()
        const response = await requestFetch<MeResponse>('/api/me', {
            // async onResponseError({ response } ) {
            //     console.log(response._data.data.error.status)
            //     console.log(response._data.data.error.message)
            // }
        })

        user.value = response.user
    };

    return {login, register, me};
};