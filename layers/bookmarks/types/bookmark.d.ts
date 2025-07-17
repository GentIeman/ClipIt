import type {StrapiUser} from "@nuxtjs/strapi";

declare global {
    interface IBookmark {
        documentId: string
        title: string
        description?: string
        link: string
        preview?: IPreview
        createdAt: string
        users: StrapiUser
    }

    interface IPreview {
        documentId: string
        url: string
        width: number
        height: number
    }
}

export {}