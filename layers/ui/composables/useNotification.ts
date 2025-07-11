import type {Strapi5Error} from "@nuxtjs/strapi";

export const useNotification = () => {
    const toast = useToast()

    const errorToast = (error: Strapi5Error, styles: INotificationStyle, retryAction?: () => Promise<void>, actionsStyle?: INotificationActionStyle) => {
        toast.add({
            title: error.error?.name || 'Error',
            description: error.error?.message || 'An error occurred',
            orientation: styles.orientation ?? undefined,
            color: styles.color ?? "primary",
            icon: styles.icon ?? undefined,
            actions: retryAction ? [{
                icon: actionsStyle?.icon ?? undefined,
                label:  actionsStyle?.label ?? undefined,
                // label: 'Retry',
                color: actionsStyle?.color ?? undefined,
                // color: 'neutral',
                variant: actionsStyle?.variant ?? undefined,
                // variant: 'outline',
                onClick: retryAction
            }] : []
        })
    }

    return {
        errorToast
    }
}