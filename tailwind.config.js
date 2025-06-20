/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'legisla-turquoise-1': '#4fe0e0',
        'legisla-turquoise-2': '#026490',
        'whatsapp': '#0ca83b',
        'whatsapp-hover': '#0a7d2d',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideUp': 'slideUp 0.2s ease-out',
        'slideDown': 'slideDown 0.2s ease-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'dropdownSlideIn': 'dropdownSlideIn 0.2s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gentleFloat': 'gentleFloat 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'gradientShift': 'gradientShift 3s ease-in-out infinite',
        'iconBounce': 'iconBounce 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          'from': { opacity: '0', transform: 'translateY(-8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        dropdownSlideIn: {
          'from': { opacity: '0', transform: 'translateY(-10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        gradientShift: {
          '0%, 100%': { 
            backgroundImage: 'linear-gradient(135deg, #026490, #22d3ee)',
          },
          '50%': { 
            backgroundImage: 'linear-gradient(135deg, #22d3ee, #4fe0e0)',
          }
        },
        iconBounce: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(5deg)' }
        }
      },
      backdropBlur: {
        '10': '10px',
        '20': '20px',
      },
      boxShadow: {
        'legisla-sm': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'legisla-md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'legisla-lg': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'legisla-xl': '0 6px 24px rgba(0, 0, 0, 0.06)',
        'legisla-turquoise': '0 4px 15px rgba(2, 100, 144, 0.2)',
        'legisla-turquoise-hover': '0 6px 20px rgba(2, 100, 144, 0.3)',
        'whatsapp': '0 4px 16px rgba(12, 168, 59, 0.25)',
        'whatsapp-hover': '0 6px 20px rgba(12, 168, 59, 0.35)',
        'float': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 8px rgba(2, 100, 144, 0.2)',
        'card-hover': '0 6px 20px rgba(2, 100, 144, 0.3)',
        'badge': '0 4px 12px rgba(245, 158, 11, 0.3)',
        'header': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'dropdown': '0 8px 25px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '16': '16px',
        '12': '12px',
        '10': '10px',
        '8': '8px',
        '6': '6px',
      },
      transitionDuration: {
        '300': '0.3s',
        '500': '0.5s',
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
};
