/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			heading: ['Unbounded'],
			copy: ['Poppins'],
			gloock: ['Gloock'],
		},
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				'spotify-green': '#1ed760',
				'spotify-black': '#121212',
			},
		},
	},
	plugins: [],
};
