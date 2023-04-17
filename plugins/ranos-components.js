import { defineNuxtPlugin } from "#app"
import ranos from "ranos-vue-components"
import "../node_modules/ranos-vue-components/dist/style.css"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(ranos)
})
