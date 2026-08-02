/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-clean-order"
  ],
  customSyntax: "postcss-styled-syntax",
  rules: {
    "value-keyword-case": null,
    "function-name-case": null,
    "declaration-empty-line-before": null,
    "no-empty-source": null,
  }
};
