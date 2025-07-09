import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        forms: defineCollection({
            type: 'data',
            source: 'forms/*.json',
            schema: z.object({
                legend: z.string(),
                fields: z.array(
                    z.object({
                        name: z.string(),
                        label: z.string(),
                        placeholder: z.string(),
                        size: z.enum(["sm", "md", "lg"])
                    })
                ),
                button: z.object({
                    label: z.string(),
                    block: z.boolean(),
                    size: z.enum(["sm", "md", "lg"]),
                    type: z.enum(["submit", "button"]),
                }),
                required: z.array(z.string())
            })
        }),
    }
})