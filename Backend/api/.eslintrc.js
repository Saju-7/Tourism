export default {
    env: {
      node: true,
      browser: true,  // Add this if you're also targeting the browser for React
      es2021: true
    },
    globals: {
      process: 'readonly'
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
  };
  