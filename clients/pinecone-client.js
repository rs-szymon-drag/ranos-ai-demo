import { PineconeClient } from "@pinecone-database/pinecone"

if (
    !import.meta.env.PINECONE_ENVIRONMENT ||
    !import.meta.env.PINECONE_API_KEY
) {
    throw new Error("Pinecone environment or api key vars missing")
}

async function initPinecone() {
    try {
        const pinecone = new PineconeClient()

        await pinecone.init({
            environment: import.meta.env.PINECONE_ENVIRONMENT ?? "",
            apiKey: import.meta.env.PINECONE_API_KEY ?? "",
        })

        return pinecone
    } catch (error) {
        console.log("error", error)
        throw new Error("Failed to initialize Pinecone Client")
    }
}

export default initPinecone
