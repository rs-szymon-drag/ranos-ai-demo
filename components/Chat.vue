<template lang="pug">
div(
    class='chat'
)
    div(
        class="item"
        v-for="item in history"
    )
        div(
            class="question"
        ) 
            div {{ item.question }}
        div(
            class="answer"
        )
            div
                div(
                    class="text"
                ) {{ item.answer }}

                //- div(
                //-     class="docs"
                //- ) {{ item.context }}
    div(
        class="item"
        v-if="loading"
    )
        div(
            class="question loading"
        )
            r-loading-dots(
                color="#fff"
            )
</template>

<script setup>
const props = defineProps({
    history: {
        type: Array,
        required: true,
    },
    loading: {
        type: Boolean,
        required: true,
    },
})

const history = computed(() => props.history)
const loading = computed(() => props.loading)
</script>

<style lang="sass" scoped>

.chat
    display: block
    width: 100%
    height: calc(100vh - 150px - 70px)
    background-color: var(--gray)
    border-top: 1px solid rgba(0,0,0,0.05)
    border-bottom: 1px solid rgba(0,0,0,0.05)
    padding: 18px
    overflow-y: auto
    .item
        .question, .answer
            margin: 24px 0
            display: flex
        .question

            justify-content: flex-start
            >div
                background-color: var(--orange)
                padding: 12px
                border-radius: 12px
                max-width: 70%
                color: #fff


        .answer
            justify-content: flex-end
            >div
                max-width: 70%
            .text
                background-color: var(--blue)
                padding: 12px
                border-radius: 12px
                color: #fff
            .docs
</style>
