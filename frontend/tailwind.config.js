import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#135bec',
				'background-light': '#f6f6f8',
				'text-light': '#0d121b',
				'card-light': '#ffffff',
				'border-light': '#e7ebf3',
			},
			fontFamily: {
				display: ['Manrope', 'sans-serif'],
			},
			borderRadius: {
				DEFAULT: '0.25rem',
				lg: '0.5rem',
				xl: '0.75rem',
				full: '9999px',
			},
		},
	},
	plugins: [forms, containerQueries],
};
