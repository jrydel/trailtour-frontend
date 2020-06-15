module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      body: ["Ubuntu", "sans-serif"]
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#007bff",
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
        navbar: "3.5rem"
      },
      boxShadow: {
        navbar: "inset 0 -1px 0 0 rgba(110,117,130,.2)"
      }
    },
  },
  variants: {},
  plugins: [],
}
