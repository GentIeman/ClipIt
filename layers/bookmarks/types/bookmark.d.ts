import type {StrapiUser} from "@nuxtjs/strapi";

declare global {
    interface IBookmark {
        documentId: string | null
        title: string
        description: string | null
        link: string
        preview: IPreview
        createdAt: string
        user: StrapiUser | StrapiUser["id"]
    }

    interface IPreview {
        documentId: string | null
        url: string
        width: number
        height: number
    }

    type BookmarkView = "cards" | "list" | "headlines"
}

export {}