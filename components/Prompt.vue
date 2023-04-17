<template lang="pug">
div(
    class="prompt"
)
    div(
        class="loader"
    )
        v-progress-linear(
            v-if="loading"
            color="var(--orange)"
            height="4"
            indeterminate
        )
    div(
        class="premade-questions"
    )
        div(
            class="title"
        ) Fast answers: 
        v-btn(
            v-for="question in premadeQuestions"
            @click="ask(question.question)"
            :disabled="loading"
            size="small"
            variant="tonal"
            color="var(--orange)"
            style="margin: 0 7px"
        ) {{ question.name }}
    div(
        class="input"
    )
        div
            v-text-field(
                v-model="text"
                @keyup.enter="ask(text)"
                variant="outlined"
                color="var(--orange)"
                label="Ask a question"
                :disabled="loading"
            )
            v-btn(
                color="var(--orange)"
                :disabled="loading"
                @click="ask(text)"
                variant="tonal"
                height="54"
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
    position: relative
    .premade-questions
        height: 65px
        overflow-x: scroll
        overflow-y: hidden
        display: flex
        align-items: center
        padding: 0 12px
        .title
            margin: 0 12px
            opacity: 0.5
    .input
        height: 80px
        padding: 12px
        >div
            display: grid
            grid-template-columns: 1fr 100px
            height: 100%
            grid-gap: 24px

.loader
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: auto
</style>
