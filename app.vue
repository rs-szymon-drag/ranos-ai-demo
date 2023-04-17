<template lang="pug">
div
    //- input(
    //-     type="file"
    //-     @change="handleFileUpload"
    //- )
    //- r-button(
    //-     :disabled="!file"
    //-     @click="importData"
    //- ) Inject data

    div(
        class="grid"
    )
        div(
            class="header"
            style="height: 90px"
        )
            div
                div(
                    style="text-transform: uppercase; font-size: 12px; color: rgba(0,0,0,0.9); margin-bottom: 2px; margin-left: 16px; font-weight: 600"
                ) Model

                v-tabs(
                    :disabled="loading"
                    v-model="mode"
                    color="var(--blue)"
                )
                    v-tab(
                        v-for="(mode, index) in modes"
                        :key="index"
                    ) 
                        span {{ mode.label }}
                        v-chip(
                            style="margin-left: 10px"
                            size="x-small"
                            v-if="mode.new"
                            color="var(--blue)"
                        ) new
            
            div(
                class="wrapper"
            )
                v-btn(
                    variant="outlined" 
                    color="var(--blue)"
                    @click="openReport"
                ) Open report

        div
            Chat(
                :history="history"
                :loading="loading"
            )

        div
            Prompt(
                @ask="q => generateAnswer(q)"
                :loading="loading"
            )
</template>

<script setup>
import axios from "@/clients/axios-client"

const history = ref([])
const loading = ref(false)

const mode = ref(null)
const modes = ref([
    {
        name: "pdf-2",
        label: "Second",
        results: 5,
        new: true,
    },
    {
        name: "pdf-3",
        label: "Largest chunks",
        results: 3,
        new: true,
    },
    {
        name: "pdf-1",
        label: "First",
        results: 7,
    },
])

const file = ref(null)

const handleFileUpload = (e) => {
    file.value = e.target.files[0]
}

const openReport = () => {
    window.open("/report.pdf", "_blank")
}

const generateAnswer = async (question) => {
    loading.value = true
    const response = await $fetch("/api/retrive-data", {
        method: "post",
        body: {
            question: question,
            history: history.value.filter((h) => !h.system),
            namespace: modes.value[mode.value].name,
            returnedResults: modes.value[mode.value].results,
        },
    })
    console.log({
        question: question,
        answer: response.text,
        context: response.docs,
    })
    history.value.push({
        question: question,
        answer: response.text,
        context: response.docs,
    })
    loading.value = false
}

const importData = async () => {
    const form = new FormData()
    form.append("pdf", file.value)

    const response = await axios.post("/upload", form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

watch(mode, (value) => {
    if (value !== null) {
        history.value.push({
            system: true,
            question: `Switched to ${modes.value[value].label} model`,
        })
    }
})
</script>

<style lang="sass" scoped>
.header
    display: flex
    align-items: flex-end
    justify-content: space-between
    padding: 0 24px
    .wrapper
        height: 100%
        display: flex
        align-items: center
        margin: 0 24px
.report
    display: inline-flex
    align-items: center
    justify-content: center
    border-radius: 12px
    background-color: var(--gray)
    font-size: 16px
    font-weight: 600
    cursor: pointer
    padding: 12px 18px
    margin: 12px
</style>
