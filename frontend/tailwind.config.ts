import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			borderRadius: { menu_radius: '20px' },
			colors: {
				bg_color: '#2e2e2e',
				text_color: '#e0e0e0',
				menu_color: 'rgba(153, 153, 153, 0.1)',
				logo_color: 'rgba(139, 195, 74, 0.65)',
				green: 'rgba(139, 195, 74, 0.65)',
				green_disabled: 'rgba(139, 195, 74, 0.45)',
				second_button: 'rgba(139, 195, 74, 0.03)',
				red: '#961C1C',
				btn_blue: 'rgba(66, 172, 201, 0.08)',
			},
		},
	},
	plugins: [],
} satisfies Config
