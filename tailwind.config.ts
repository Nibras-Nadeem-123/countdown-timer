import type { Config } from 'tailwindcss';
import tailwindTextShadow from 'tailwindcss-textshadow';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textShadow: {
        'custom-light': '2px 2px 4px #fff',
        'custom-dark': '2px 2px 6px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'custom-bg': "url('/images/background.jpg')",
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [
    tailwindTextShadow, // Correctly imported plugin
  ],
} satisfies Config;
