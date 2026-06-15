import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        console.error("Error: OPENROUTER_API_KEY is not defined in server environment.");
        return res.status(500).json({ 
            error: "Internal Server Error", 
            details: "OpenRouter API key is not configured on the server." 
        });
    }

    
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ 
            error: "Bad Request", 
            details: "Missing or invalid 'messages' field in request body." 
        });
    }

    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "google/gemma-3-12b-it",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful AI assistant with real-time web search capabilities. Answer questions directly and naturally. Only use numbered or bulleted lists when you are actually listing multiple distinct items."
                    },
                    ...messages
                ],
                tools: [
                    {
                        type: "openrouter:web_search"
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "React AI Chatbot"
                }
            }
        );

    
        let botMessageContent = response.data?.choices?.[0]?.message?.content;
        if (!botMessageContent) {
            console.error("No message content returned by OpenRouter API:", response.data);
            return res.status(502).json({
                error: "Bad Gateway",
                details: "No response content received from the AI model."
            });
        }

        
        botMessageContent = botMessageContent
            .replace(/\[openrouter_web_search\(.*?\)\]/g, '')
            .replace(/\[web_search\(.*?\)\]/g, '')
            .trim();

        res.json({ content: botMessageContent });

    } catch (error) {
        console.error("Error calling OpenRouter API:", error.response?.data || error.message);
        
        
        const status = error.response?.status || 500;
        const errorMessage = error.response?.data?.error?.message || error.message || "Unknown error";
        
        res.status(status).json({
            error: "AI Gateway Error",
            details: errorMessage
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
