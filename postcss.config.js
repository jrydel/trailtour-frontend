module.exports = {
    theme: {},
    variants: {},
    plugins: [
        require("tailwindcss")("./tailwind.config.js"),
        require("autoprefixer")
    ]
}