
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a follow-up draft based on the original message.
 */
export const generateFollowUpDraft = async (message: Message): Promise<string> => {
  try {
    // Use ai.models.generateContent to query GenAI with both the model name and prompt.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional assistant. Help me write a polite and concise follow-up message. 
      I sent a message to ${message.contactName} on ${message.platform} about: "${message.summary}". 
      It has been a few days and they haven't replied. 
      Generate a short, friendly follow-up draft that is appropriate for the ${message.platform} platform. 
      Return ONLY the draft text, no explanations.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    // The GenerateContentResponse object features a text property (not a method).
    return response.text?.trim() || "Hi, just checking in to see if you had a chance to look at my previous message. Best!";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Hi, just wanted to circle back on my previous message. Let me know when you have a moment!";
  }
};

/**
 * Suggests an appropriate follow-up time based on the content summary.
 */
export const suggestFollowUpTime = async (summary: string): Promise<number> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Analyze this message summary: "${summary}". Suggest a follow-up interval in days (number only, 1 to 14). Urgent tasks should be 1-2 days, networking 3-5 days, general 7 days. Return ONLY the number.`,
        });
        // The GenerateContentResponse object features a text property (not a method).
        const val = parseInt(response.text?.trim() || "3");
        return isNaN(val) ? 3 : val;
    } catch (error) {
        console.error("AI Suggestion Error:", error);
        return 3;
    }
}
