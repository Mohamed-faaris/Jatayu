require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

if (!API_KEY) {
    console.error("⚠️ ERROR: Missing GEMINI_API_KEY in .env file");
    process.exit(1); // Stop execution if API key is missing
}

// Route to handle AI requests
app.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required!" });
    }

    try {
        const response = await axios.post(API_URL, {
            contents: [{ parts: [{ text: "Generate exactly 30 MCQs and 5 normal qns in JSON format." + prompt }] }]
        }, {
            headers: { "Content-Type": "application/json" }
        });

        let aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // Ensure it's a valid JSON response
        aiResponse = aiResponse.replace(/```json|```/g, '').trim(); // Remove Markdown code block
        const jsonResponse = JSON.parse(aiResponse); // Convert string to JSON object

        res.json(jsonResponse); // Send JSON response directly
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
});


// Serve HTML file when user visits root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
