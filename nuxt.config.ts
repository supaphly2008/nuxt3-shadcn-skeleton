import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  css: [join(rootDir, 'assets/css/tailwind.css')],

  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0'
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001' // <--- your external backend
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['vue'] // <-- ignore .ts so index.ts won't register
    }
  ],

  typescript: { strict: true, typeCheck: true },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'theme'
  },

  app: {
    head: {
      title: 'Nuxt Skeleton (TS)',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'light dark' }
      ]
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
