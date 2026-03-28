import "vuetify/styles"

import { createPinia } from "pinia"
import { createApp } from "vue"
import { createVuetify } from "vuetify"

import App from "@/App.vue"

import { router } from "./router"

export const app = createApp(App)
const vuetify = createVuetify()
const pinia = createPinia()

app.use(router)
app.use(vuetify)
app.use(pinia)

app.mount("#app")
