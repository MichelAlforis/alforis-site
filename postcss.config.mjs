import { couleurs } from './styles/generated-colors.js'

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    'postcss-simple-vars': {
      variables: couleurs,
    },
    tailwindcss: {},
    autoprefixer: {},
  },
}

