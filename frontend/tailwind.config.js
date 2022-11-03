module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        tablet: { min: '768px' },
        desktop: { min: '1200px' },
      },
      colors: {
        dark: '#09443E',
        main: '#1E7D73',
        light: '#77B9A5',
        lighter: '#BAE1D3',
        white: '#FFFFFF',
        black: '#212427',
        grey: '#E8E8E8',
        // Tile Colors
        'tile-red': '#eb555b',
        'tile-pink': '#f4aece',
        'tile-orange': '#f9b43d',
        'tile-grey': '#e2e7df',
      },
      fontSize: {
        h1: '3.125rem',
        h2: '2.5rem',
        h3: '2rem',
        h4: '1.5rem',
        h5: '1.25rem',
        'text-normal': '1rem',
        'text-sm': '0.625rem',
      },
    },
  },
  plugins: [],
};
