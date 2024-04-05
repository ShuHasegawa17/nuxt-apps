// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/content'],
  content: {
    highlight: {
      theme: {
        default: 'min-light',
        dark: 'min-dark',
      },
    },
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  colorMode: {
    classSuffix: '',
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
    },
  },
});
