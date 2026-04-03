import "vuetify/styles"

import { createPinia } from "pinia"
import { createApp } from "vue"
import { createVuetify } from "vuetify"

import App from "@/App.vue"
import { darkPurple, lightPurple } from "@/core/plugins/vuetify.ts"
import { router } from "@/core/router"

export const app = createApp(App)
const vuetify = createVuetify({
    theme: {
        defaultTheme: "lightPurple",
        themes: {
            lightPurple,
            darkPurple,
        },
    },
})
const pinia = createPinia()

app.use(router)
app.use(vuetify)
app.use(pinia)

app.mount("#app")
