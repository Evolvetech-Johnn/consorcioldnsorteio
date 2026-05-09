import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: '#0066CC',
          light: '#E6F0FF',
          dark: '#003D99',
        },
        green: {
          primary: '#00A86B',
          light: '#E6F9F0',
          dark: '#005A3D',
        },
        gray: {
          100: '#F5F5F5',
          200: '#E8E8E8',
          500: '#808080',
          800: '#2B2B2B',
        },
        status: {
          error: '#FF4444',
          warning: '#FFB800',
          info: '#0066CC',
          success: '#00A86B',
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 12px rgba(0,0,0,0.1)',
        lg: '0 10px 25px rgba(0,0,0,0.15)',
        xl: '0 20px 40px rgba(0,0,0,0.2)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['36px', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        h4: ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
} satisfies Config
