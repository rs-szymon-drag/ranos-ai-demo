import { OpenAI } from "langchain/llms"

if (!import.meta.env.OPENAI_API_KEY) {
    throw new Error("Missing OpenAI Credentials")
}

export default new OpenAI({
    temperature: 0,
})
