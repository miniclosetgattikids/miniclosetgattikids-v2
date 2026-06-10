import {
   defineConfig,
   minimal2023Preset as preset,
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
   images: ['public/logo.webp', 'public-dev/logo.webp'],
   preset,
})
