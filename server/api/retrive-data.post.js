import { callVectorDBQAChain } from "@/utilities/vector-store"
import Pinecone from "~/clients/pinecone-client"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const pineconeClient = await Pinecone()
    const index = pineconeClient.Index(import.meta.env.PINECONE_INDEX_NAME)
    const query = body.question
    const namespace = "pdf-1"

    const response = await callVectorDBQAChain(
        query,
        index,
        namespace,
        body.history
    )
    return response
})
