export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#000000ff',
          100: '#e7fedbff',
          200: '#d7febfff',
          300: '#adfd93ff',
          400: '#8efa60ff',
          500: '#86f63bff',
          600: '#25eb2cff',
          700: '#39d81dff',
          800: '#25af1eff',
          900: '#3b8a1eff',
        },
      },
    },
  },
  plugins: [],
}
