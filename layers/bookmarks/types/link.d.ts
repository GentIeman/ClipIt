declare global {

    interface ILinkPreview {
        title: string
        description: string | null
        image?: IPreview
        siteName: string | null
    }

}

export {}