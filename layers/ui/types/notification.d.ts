declare global {
    interface INotificationStyle {
        orientation?: "horizontal" | "vertical"
        color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"
        icon?: string
    }

    interface INotificationActionStyle extends Pick<INotificationStyle, "color" | "icon"> {
        label?: string
        variant?: "outline"
    }
}

export {}