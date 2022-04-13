module.exports = {
    extends: 'airbnb',
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      "linebreak-style": ["error", "windows"],
      "@typescript-eslint/no-non-null-assertion": 0,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": 0,
      "@typescript-eslint/no-this-alias": 0,
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-unnecessary-type-constraint": 0
    }
  };