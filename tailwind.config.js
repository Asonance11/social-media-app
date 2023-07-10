/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['"Roboto"', 'sans-serif'],
			},

			colors: {
				current: 'currentColor',
				darkBlue: '#143c8a',
				eerieBlack: '#1b1b1b',
				darkSilver: '#717171',
				silverChalice: '#ababab',
				gainsboro: '#dddcdc',
				lotion: '#fafafa',
			},
		},
	},
	plugins: [],
};
