
import { GoogleGenAI, Type } from "@google/genai";

// Funzione sicura per ottenere la chiave API senza crashare il browser
const getSafeApiKey = () => {
  try {
    // @ts-ignore
    return (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
  } catch (e) {
    return '';
  }
};

const apiKey = getSafeApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getDailyFragment = async () => {
  if (!ai) {
    return { text: "La prima gelata dell'inverno sa di aghi d'argento e promesse dimenticate.", author: "Il Sommelier" };
  }

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
    console.warn("Gemini Error or missing key:", error);
    return { text: "Il sapore del mattino è un segreto custodito tra i chicchi di caffè.", author: "Il Sommelier" };
  }
};
