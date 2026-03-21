import { createApp } from "vue"
import router from "./router"
import App from "@/App.vue"
import "vuetify/styles"
import { createVuetify } from "vuetify"

export const app = createApp(App)
const vuetify = createVuetify()

app.use(vuetify)
app.use(router)

app.mount("#app")
