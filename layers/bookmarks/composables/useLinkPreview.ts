import { shallowRef } from 'vue'

export function useLinkPreview() {
    const preview = shallowRef<ILinkPreview | null>(null)
    const isLoading = shallowRef(false)
    const error = shallowRef<Error | null>(null)

    const getMetaContent = (doc: Document, selector: string) => {
        const element = doc.querySelector(selector) as HTMLMetaElement | null
        return element?.content || null
    }

    const fetchPreview = async (url: string) => {
        isLoading.value = true
        error.value = null

        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
            const data = await response.json()
            const html = data.contents

            const parser = new DOMParser()
            const doc = parser.parseFromString(html, 'text/html')

            preview.value = {
                title: getMetaContent(doc, 'meta[property="og:title"]') || doc.title,
                description: getMetaContent(doc, 'meta[property="og:description"]') ||
                    getMetaContent(doc, 'meta[name="description"]'),
                image: getMetaContent(doc, 'meta[property="og:image"]'),
                siteName: getMetaContent(doc, 'meta[property="og:site_name"]')
            }
        } catch (err) {
            error.value = err as Error
        } finally {
            isLoading.value = false
        }
    }

    const reset = () => {
        preview.value = null
        error.value = null
    }

    return {
        preview,
        isLoading,
        error,
        fetchPreview,
        reset
    }
}