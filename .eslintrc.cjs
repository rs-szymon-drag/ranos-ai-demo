module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-recommended",
        "prettier",
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "vue/multi-word-component-names": "off",
    },
}
