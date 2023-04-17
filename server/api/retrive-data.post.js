import { callVectorDBQAChain } from "@/utilities/vector-store"
import Pinecone from "~/clients/pinecone-client"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const pineconeClient = await Pinecone()
    const index = pineconeClient.Index(import.meta.env.PINECONE_INDEX_NAME)
    const query = body.question
    const namespace = body.namespace ?? "pdf-1"
    const history = body.history ?? []
    const returnedResults = body.returnedResults ?? 5

    const response = await callVectorDBQAChain(
        query,
        index,
        namespace,
        history,
        returnedResults
    )
    return response
})
