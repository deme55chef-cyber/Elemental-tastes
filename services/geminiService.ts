
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDailyFragment = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Genera una micro-finzione surrealista di massimo 2 frasi per un'app mobile chiamata 'Elemental Tastes'. Deve riguardare il gusto, l'olfatto o sensazioni elementari. Sii poetico, breve e scrivi RIGOROSAMENTE IN ITALIANO.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            author: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "La prima gelata dell'inverno sa di aghi d'argento e promesse dimenticate.", author: "Il Sommelier" };
  }
};
