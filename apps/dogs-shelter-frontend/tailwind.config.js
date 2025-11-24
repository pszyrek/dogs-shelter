import baseConfig from '../../packages/ui/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
    },
  },
  plugins: [baseConfig.plugins],
};
