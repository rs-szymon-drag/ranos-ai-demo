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
            style="height: 70px"
        )
            div(
                class="report"
                @click="openReport"
            ) Loaded report

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
            history: history.value,
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
</script>

<style lang="sass" scoped>
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
