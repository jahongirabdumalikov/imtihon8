import scrollbar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'class',
	content: [
		'./app/**/*.{ts,tsx}',
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			keyframes: {
				fadeUp: {
					'0%': { opacity: '0', transform: 'translateY(50px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				fadeUp: 'fadeUp 0.4s ease-out forwards',
			},
			boxShadow: {
				dark: '0 2px 8px rgba(255, 255, 255, 0.05)',
			},
		},
	},
	plugins: [scrollbar],
}

export default config
