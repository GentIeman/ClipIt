export const useAuth = () => {
    const user = useUser();

    const login = async (identifier: string, password: string) => {
        user.value = await $fetch<User>("/api/login", {
            method: "POST",
            body: {identifier, password},
            // async onResponseError({ response } ) {
            //     console.log(response._data.data.error.status)
            //     console.log(response._data.data.error.message)
            // }
        });
    };

    const register = async (email: string, password: string, username: string) => {
        user.value = await $fetch<User>("/api/register", {
            method: "POST",
            body: {email, password, username},
            // async onResponseError({ response } ) {
            //     console.log(response._data.data.error.status)
            //     console.log(response._data.data.error.message)
            // }
        });
    };

    return {login, register};
};