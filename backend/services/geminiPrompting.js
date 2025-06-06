
import GoogleGenerativeAI from "@google/genai";
import 'dotenv/config';

// Function to generate AI content based on a prompt
async function generateAIResponse(prompt) {
    // Initialize the generative AI model with your API key
    const genAI = new GoogleGenerativeAI(process.env.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
        // Generate content based on the provided prompt
        const result = await model.generateContent(prompt);
        // Return the result text
        console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw error;
    }
}

export default generateAIResponse;