import {defineStore} from 'pinia'
import type {StrapiUser} from "@nuxtjs/strapi";

export const useBookmarksStore = defineStore('bookmarks', {
    state: (): {
        bookmarks: IBookmark[]
    } => ({
        bookmarks: []
    }),
    actions: {
        fetchBookmarks: async (user: StrapiUser ) => {
            const {find} = useStrapi()
            if (!user?.id) throw new Error('User ID not defined')

            try {
                const {id} = user
                const {data} = await find<IBookmark>('bookmarks', {
                    fields: ['title', 'description', 'createdAt', "link"],
                    populate: {
                        preview: true,
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

                console.log(data)


            } catch (error) {
                console.error('Error fetching bookmarks:', error)
            }

        }
    }
})