import { shallowRef, toValue } from 'vue'

export function useLinkPreview() {
    const preview = shallowRef<ILinkPreview | null>(null)
    const error = shallowRef<Error | null>(null)

    const getMetaContent = (doc: Document, selector: string) => {
        const element = doc.querySelector(selector) as HTMLMetaElement | null
        return element?.content || null
    }

    const fetchPreview = async (url: string) => {
        error.value = null
        const targetUrl = toValue(url)

        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`)
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
        }
    }

    const reset = () => {
        preview.value = null
        error.value = null
    }

    return {
        preview,
        error,
        fetchPreview,
        reset
    }
}