import { OpenAIEmbeddings } from "langchain/embeddings"
import { OpenAI } from "langchain/llms"
import { Document } from "langchain/document"
import { PromptTemplate } from "langchain/prompts"

const template = `You are an AI assistant providing helpful advice. You are given the following extracted parts of a long document and, question and history of conversation. Provide a conversational answer based on the context provided.
If you can't find the answer in the context below, just say "Hmm, I'm not sure." Don't try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
The contenxt is an equity research report. The question is a question about the content of the document. The history is a list of previous questions and answers.
=========
Question: {question}
=========
Context: {context}
=========
History: {history}
=========
Answer:`

const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["question", "context", "history"],
})

const embeddings = new OpenAIEmbeddings()

export const embedQuery = async (query, embeddings) => {
    const embeddedQuery = await embeddings.embedQuery(query)
    return embeddedQuery
}

export const similarityVectorSearch = async (
    vectorQuery,
    k = 3,
    index,
    namespace
) => {
    const results = await index.query({
        queryRequest: {
            topK: k,
            includeMetadata: true,
            vector: vectorQuery,
            namespace,
        },
    })

    const result = []

    if (results.matches) {
        for (const res of results.matches) {
            const { text: pageContent, ...metadata } = res?.metadata
            if (res.score) {
                result.push([
                    new Document({ metadata, pageContent }),
                    res.score,
                ])
            }
        }
    }

    return result.map((result) => result[0])
}

export const callVectorDBQAChain = async (
    query,
    index,
    namespace,
    history = []
) => {
    const question = query
    const returnedResults = 3
    const questionEmbedding = await embedQuery(question, embeddings)

    const docs = await similarityVectorSearch(
        questionEmbedding,
        returnedResults,
        index,
        namespace
    )

    const inputs = {
        question,
        context: docs
            .map((d) => d.pageContent)
            .join(" --- START OF ANOTHER CONTEXT --- "),
        history: history
            .map((i) => `Question: ${i.question} | Answer: ${i.answer} `)
            .join(" --- ANOTHER QUESTION AND ANSWER --- "),
    }

    const chat = new OpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.1,
    })

    const input = await prompt.format(inputs)
    const result = await chat.call(input)

    return { text: result, docs }
}
