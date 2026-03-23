/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Light theme colors
        slate: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Brand accent colors (maintain these)
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        blue: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
        orange: {
          500: '#f97316',
          600: '#ea580c',
        },
        red: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        amber: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
        },
        // Legacy dark mode colors (kept for backward compatibility)
        carbon: {
          950: '#050709',
          900: '#0a0e13',
          800: '#0f1520',
          700: '#161e2e',
          600: '#1e2a3d',
        },
        jade: {
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        sky: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #10b981, 0 0 10px #10b981' },
          '100%': { boxShadow: '0 0 20px #10b981, 0 0 40px #10b98150' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)",
        'radial-jade': "radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%)",
      }
    },
  },
  plugins: [],
}
