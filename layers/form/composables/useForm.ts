export const useForm = <T extends FormState>(
    initialState: T,
    submitHandler: (state: T) => Promise<void> | void,
) => {

    const state = reactive({...initialState}) as T

    const resetForm = () => {
        Object.assign(state, initialState)
    }

    const submit = async () => {
        if (!submitHandler) return

        try {
            await submitHandler(state)
            resetForm()
        } catch (error) {
            console.error(error)
        }
    }

    return {
        state,
        submit,
        resetForm,
    }
}