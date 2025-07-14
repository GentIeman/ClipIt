import type {StrapiUser} from "@nuxtjs/strapi";

declare global {
    interface IBookmark {
        documentId: string
        title: string
        description?: string
        link: string
        preview?: string
        createdAt: string
        users: StrapiUser
    }
}

export {}