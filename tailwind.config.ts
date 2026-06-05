import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: '#FF5A5F',
        'coral-dark': '#E04E53',
        'coral-light': '#FFF0F0',
        'deep-text': '#222222',
        'body-text': '#484848',
        'muted-text': '#717171',
        'app-bg': '#F7F7F7',
        'card-border': '#EBEBEB',
        success: '#008A05',
        warning: '#FFB400',
        'data-blue': '#0369A1',
        'data-blue-light': '#E0F2FE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
