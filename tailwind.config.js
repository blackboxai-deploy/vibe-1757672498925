/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'voice-primary': '#3b82f6',
        'voice-secondary': '#1e40af',
        'blackbox-accent': '#8b5cf6',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444'
      },
      animation: {
        'pulse-slow': 'pulse 3s linear infinite',
        'voice-wave': 'voiceWave 2s ease-in-out infinite',
        'deploy': 'deploy 1.5s ease-out forwards'
      },
      keyframes: {
        voiceWave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' }
        },
        deploy: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}