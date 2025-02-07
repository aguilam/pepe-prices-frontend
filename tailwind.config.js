/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#262930',
        'secondd-coor': '#434957',
        'second-text-color': '#d8d8d8',
        'dark-color': '#18181BBF',
        'gray-color': '#A1A1AA33',
        'main-bg-color': '#1a1d24',       /* Основной цвет фона */
        'card-bg-color': '#2a2f3a',
        'card-border-color': '#3c4350', /* Для бордюра карточек */
   /* Цвет карточек */
        'text-color': '#e5e5e5',        /* Основной цвет текста */
        'secondary-text-color': '#b3b3b3', /* Вторичный цвет текста */
        'header-footer-color': '#14171c', /* Цвет футера и хедера */
        'accent-color': '#4d91ff',
        'searchbar-bg': '#2f3541',  // Фон бара поиска
        'button-bg': '#3a4150',     // Фон кнопок
        'button-border': '#4d91ff', // Бордер кнопок
        'input-bg': '#252932',      // Фон инпутов
        'input-border': '#3c4350',
      }
    },
  },
  plugins: [],
}

