export const useAuth = () => {
    const user = useUser();

    const login = async (identifier: string, password: string) => {
        try {
            user.value = await $fetch<User>("/api/login", {
                method: "POST",
                body: {identifier, password},
            });

        } catch (error) {
            console.error(error)
        }
    };

    const register = async (email: string, password: string, username: string) => {
        try {
            user.value = await $fetch<User>("/api/register", {
                method: "POST",
                body: {email, password, username},
            });
        } catch (error) {
            console.error(error)
        }
    };

    return {login, register};
};