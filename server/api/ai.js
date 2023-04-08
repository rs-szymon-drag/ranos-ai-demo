import { OpenAI } from "langchain/llms"

export const run = async () => {
    try {
        const model = new OpenAI({
            openAIApiKey: "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",
            temperature: 0.05,
        })
        const response = await model.call("What is capital city of Brazil?")
        console.log(response)
    } catch (e) {
        console.log(e)
    }
}
