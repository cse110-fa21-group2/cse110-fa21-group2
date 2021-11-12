module.exports = {
  extends: [
    "stylelint-config-standard",
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
    'font-family-no-missing-generic-family-keyword': [
      true,
    ]
  }
};