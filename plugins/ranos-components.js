import { defineNuxtPlugin } from "#app"
import ranos from "ranos-vue-components"
import "../node_modules/ranos-vue-components/dist/style.css"

// import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
})

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vuetify)
    nuxtApp.vueApp.use(ranos)
})
