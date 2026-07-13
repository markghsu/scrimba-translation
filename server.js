import express from "express"
import Anthropic from "@anthropic-ai/sdk"

process.loadEnvFile()

const app = express()
app.use(express.json())

app.post("/api/translate", async (req, res) => {
    console.log('rest')
    const { language, "translation-input": translationInput } = req.body

    console.log("language", language)
    console.log("translationInput", translationInput)
    try {
        const response = await askAI(`${language}: ${translationInput}`)
        res.status(200).json({translatedText: response})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error occurred while fetching AI response. Please try again later." })
        return
    }
});

const PORT = process?.env?.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const client = new Anthropic({
  apiKey:  process.env.AI_APIKEY
});

async function askAI(prompt) {
    const messages = []
    messages.push({ role: "user", content: prompt })
    try {
        const response = await client.messages.create({
            model: process.env.AI_MODEL,
            max_tokens: 1024,
            messages: messages,
            system: `You are a translator.
            The user will give you a language and a phrase.
            Please translate the phrase from English into the given language.
            Skip any introductions or conclusions.
            Only respond with the translated phrase.
            <examples>
            <example>
            User: French: I want a banana.
            AI: Je veux une banane.
            </example>
            <example>
            User: Korean: Dog
            AI: 개
            </example>
            <example>
            User: Spanish: We ran to school.
            AI: Corrimos a la escuela.
            </example>
            </examples>
            ` 
        })
        console.log("response:", response)
        return response.content[0].text
    }
    catch (err) {
        console.error(err)
        return "Error from server"
    }
}