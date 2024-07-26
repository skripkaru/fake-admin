// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' },
  // },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  modules: [
    '@unocss/nuxt',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  compatibilityDate: '2024-04-03',
})
