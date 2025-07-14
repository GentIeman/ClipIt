import {defineStore} from 'pinia'
import type {StrapiUser} from "@nuxtjs/strapi";

export const useBookmarkStore = defineStore('bookmarkStore', {
    state: (): {
        bookmarks: IBookmark[]
    } => ({
        bookmarks: []
    }),
    actions: {
        async fetchBookmarks(user: StrapiUser) {
            const {find} = useStrapi()
            if (!user?.id) throw new Error('User ID not defined')

            try {
                const {id} = user
                const {data} = await find<IBookmark>('bookmarks', {
                    fields: ['title', 'description', 'createdAt', "link"],
                    populate: {
                        preview: {
                            fields: ['url', 'width', 'height']
                        },
                        user: {
                            fields: ['id']
                        },
                        sort: ['createdAt:desc'],
                        filters: {
                            user: {
                                id: {
                                    $eq: id
                                }
                            }
                        }
                    }
                })


                if (!data) return false
                this.bookmarks = data

            } catch (error) {
                console.error('Error fetching bookmarks:', error)
            }

        }
    }
})