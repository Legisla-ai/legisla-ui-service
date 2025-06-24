/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
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
        'breathe': 'breathe 3s ease-in-out infinite',
        'waves': 'waves 2s ease-in-out infinite',
        'softGlow': 'softGlow 2s ease-in-out infinite alternate',
        'readingPulse': 'readingPulse 2s ease-in-out infinite',
        'scanningBounce': 'scanningBounce 1.5s ease-in-out infinite',
        'sparkle': 'sparkle 2.5s ease-in-out infinite',
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
          '50%': { backgroundPosition: '0% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        gradientShift: {
          '0%, 100%': { 
            backgroundImage: 'linear-gradient(135deg, #0891b2, #22d3ee)',
          },
          '50%': { 
            backgroundImage: 'linear-gradient(135deg, #22d3ee, #67e8f9)',
          }
        },
        iconBounce: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(5deg)' }
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' }
        },
        waves: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
          '100%': { transform: 'scale(1.2)', opacity: '0' }
        },
        softGlow: {
          '0%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(8, 145, 178, 0.4)' }
        },
        readingPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' }
        },
        scanningBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-2px)' },
          '50%': { transform: 'translateY(0)' },
          '75%': { transform: 'translateY(-1px)' }
        },
        sparkle: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
          '25%': { transform: 'rotate(90deg) scale(1.1)', opacity: '0.8' },
          '50%': { transform: 'rotate(180deg) scale(1.2)', opacity: '0.6' },
          '75%': { transform: 'rotate(270deg) scale(1.1)', opacity: '0.8' }
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
        'card': '0 2px 8px rgba(34, 211, 238, 0.2)',
        'card-hover': '0 6px 20px rgba(34, 211, 238, 0.3)',
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
