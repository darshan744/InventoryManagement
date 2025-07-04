
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // enables `.dark` toggling
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'muted-foreground': 'var(--muted-foreground)',
      }
    }
  },
  plugins: []
}

export default config
