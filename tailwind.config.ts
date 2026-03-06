import { type Config } from "tailwindcss"

const config: Config = {
    darkMode: "class", // 👈 wajib ada ini
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
}

export default config
