import "vuetify/styles"
import "./styles/global.scss"

import App from "./App.vue"

import { createApp } from "vue"
import { createVuetify } from "vuetify"
import { aliases, mdi } from "vuetify/iconsets/mdi-svg"
import { en } from "vuetify/locale"

const app = createApp(App)

app.use(createVuetify({
  icons: {
    aliases,
    defaultSet: "mdi",
    sets: { mdi },
  },
  locale: {
    locale: "en",
    messages: { en },
  },
  ssr: false,
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          accent: "#BD93F9",
          background: "#00040E",
          error: "#FF5555",
          info: "#8BE9FD",
          primary: "#FFB86C",
          secondary: "#50FA7B",
          success: "#50FA7B",
          text: "#F8F8F2",
          warning: "#FF79C6",
        },
        dark: true,
      },
    },
    variations: {
      colors: [ "background" ],
      darken: 0,
      lighten: 2,
    },
  },
}))

app.mount("#app")
