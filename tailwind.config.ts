import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inconsolata: ['var(--ff-inconsolata)', 'monospace'],
        'noto-sans': ['var(--ff-noto-sans)', 'sans-serif'],
      },
      colors: {
        primary: '#00252a',
        'primary-container': '#003C43',
        secondary: '#aaeaf5',
        accent: '#E3FEF7',
        surface: '#f6fafa',
        'surface-low': '#f0f4f4',
        'surface-lowest': '#ffffff',
        'on-surface': '#181c1d',
      },
    },
  },
  plugins: [],
};

export default config;