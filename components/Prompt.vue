<template lang="pug">
div(
    class="prompt"
)
    div(
        class="premade-questions"
    )
        div(
            class="title"
        ) Fast answers: 
        div(
            class="premade-question"
            v-for="question in premadeQuestions"
            @click="ask(question.question)"
            :class="{ disabled: loading }"
            v-ripple="{ color: 'rgba(0,0,0,0.1)'}"
        ) {{ question.name }}
    div(
        class="input"
    )
        div
            input(
                type="text"
                v-model="text"
                @keyup.enter="ask(text)"
                placeholder="Ask a question"
                :disabled="loading"
            )
            button(
                v-ripple="{ color: 'rgba(0,0,0,0.1)'}"
                :disabled="!text || loading"
                @click="ask(text)"
            ) Ask
</template>

<script setup>
const emit = defineEmits(["ask"])

const props = defineProps({
    loading: {
        type: Boolean,
        required: true,
    },
})

const loading = computed(() => props.loading)

const text = ref("")

const premadeQuestions = ref([
    {
        name: "Summary",
        question: "Create a summary of the report",
    },
    {
        name: "Key points",
        question: "What are the key points of the report?",
    },
])

const ask = (question) => {
    emit("ask", question)
}
</script>

<style lang="sass" scoped>
.prompt
    height: 120px
    .premade-questions
        height: 65px
        overflow-x: scroll
        overflow-y: hidden
        display: flex
        align-items: center
        padding: 0 12px
        .premade-question
            background-color: var(--gray)
            padding: 8px 16px
            margin: 12px
            cursor: pointer
            font-size: 14px
            font-weight: 600
            border-radius: 12px
            &.disabled
                pointer-events: none
                opacity: 0.5
        .title
            margin: 0 12px
            opacity: 0.5
    .input
        height: 80px
        padding: 12px
        >div
            border-radius: 12px
            overflow: hidden
            border: 1px solid rgba(0,0,0,0.1)
            display: grid
            grid-template-columns: 1fr 100px
            height: 100%
        input
            box-shadow: none
            border: none
            border-radius: 0
            outline: none
            background-color: var(--gray)
            padding: 0 12px
            font-size: 16px
            &:disabled
                background-color: rgba(0,0,0,0.1)
                color: rgba(0,0,0,0.5)
        button
            background-color: var(--orange)
            color: #fff
            border: none
            outline: none
            cursor: pointer
            &:disabled
                background-color: rgba(0,0,0,0.15)
                cursor: not-allowed
                color: rgba(0,0,0,0.5)
</style>
