<template lang="pug">
div(
    class='chat'
)
    div(
        class="item"
        v-for="item in history"
    )
        div(
            class="system"
            v-if="item.system"
        ) {{ item.question }}
        div(
            v-if="!item.system"
            class="question"
        ) 
            div {{ item.question }}
        div(
            v-if="!item.system"
            class="answer"
        )
            div
                div(
                    class="text"
                ) {{ item.answer }}

                div(
                    class="docs"
                ) 
                    div(
                        style="margin: 12px 6px"
                        v-for="doc in item.context"
                    )
                        v-btn(
                            variant="tonal"
                            color="var(--blue)"
                            size="small"
                            @click="openedDoc = doc; opened = true"
                        ) {{ getName(doc) }}
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

    v-dialog(
        v-model="opened"
        width="800"
    )
        v-card
            div(class="pop-up") {{ openedDoc }}
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

const openedDoc = ref(null)
const opened = ref(false)

const getName = (doc) => {
    if (doc.metadata?.partial_summary) {
        return `Partial summary: ${doc.metadata.index}`
    }
    if (doc.metadata?.summary) {
        return "Summary"
    }
    if (doc.metadata?.chunk) {
        return `Some chunk`
    }

    return "Unknown"
}
</script>

<style lang="sass" scoped>
.pop-up
    padding: 44px
.chat
    display: block
    width: 100%
    height: calc(100vh - 150px - 90px)
    background-color: var(--gray)
    border-top: 1px solid rgba(0,0,0,0.05)
    border-bottom: 1px solid rgba(0,0,0,0.05)
    padding: 18px
    overflow-y: auto
    .item
        .question, .answer
            margin: 24px 0
            display: flex

        .system
            width: 100%
            text-align: center
            color: rgba(0,0,0,0.3)
            font-size: 14px
            margin: 24px 0

        .question
            justify-content: flex-start
            >div
                background-color: var(--orange)
                padding: 18px 22px
                border-radius: 3px
                max-width: 70%
                color: #fff


        .answer
            justify-content: flex-end
            >div
                max-width: 70%
            .text
                background-color: var(--blue)
                padding: 18px 22px
                border-radius: 3px
                color: #fff
            .docs
                display: flex
                flex-wrap: wrap
                justify-content: flex-end
                margin-right: -6px
</style>
