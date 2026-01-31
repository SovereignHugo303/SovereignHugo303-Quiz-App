
import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuizQuestions = async (topic: string): Promise<Question[]> => {
  const prompt = `Generate 5 challenging multiple-choice questions about ${topic}. Ensure each question has exactly 4 options and one correct answer. Make the difficulty level moderate to advanced.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswerIndex: { type: Type.INTEGER }
          },
          required: ["id", "question", "options", "correctAnswerIndex"]
        }
      }
    }
  });

  const jsonStr = response.text.trim();
  try {
    return JSON.parse(jsonStr) as Question[];
  } catch (error) {
    console.error("Failed to parse quiz response:", error);
    throw new Error("Invalid quiz format received from AI.");
  }
};
