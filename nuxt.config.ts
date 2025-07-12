// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    modules: [
        '@nuxt/test-utils',
        '@nuxt/ui',
        '@pinia/nuxt',
        '@nuxtjs/strapi',
        '@nuxt/eslint',
        '@nuxt/content',
    ],
    css: ['~/assets/css/main.css'],
    extends: [
        "./layers/form",
        "./layers/ui",
        "./layers/base",
    ],
    app: {
        head: {
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        }
    },
    routeRules: {
        '/': {redirect: '/bookmarks'}
    }
})