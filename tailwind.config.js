module.exports = {
  purge: [],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#197BBD",
        success: "#28a745",
        danger: "#D61A3C",
        dark: "#354052",
        light: "#fff",
        background: "#f5f7fb"
      },
      height: {
        navbar: "3.5rem"
      },
      width: {
        changelog: "21px"
      },
      minHeight: {
        navbar: "3.5rem",
      },
      maxHeight: {
        searchbar: "16rem",
      },
      boxShadow: {
        navbar: "inset 0 -1px 0 0 rgba(110,117,130,.2)"
      },
      fontSize: {
        "404": "10rem"
      }
    },
  },
  variants: {},
  plugins: [],
}
