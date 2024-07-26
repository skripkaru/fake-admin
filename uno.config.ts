import {
  defineConfig,
  presetUno,
  presetWebFonts,
  presetTypography,
  presetAttributify,
  presetIcons,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter',
      },
    }),
    presetIcons({
      scale: 1.25,
      cdn: 'https://esm.sh/',
    }),
  ],
})