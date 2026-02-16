"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateAdminInsights(rides) {
  try {
    
const prompt = `
Analyze this ride booking data and return insights in this format only:

- Insight 1
- Insight 2
- Insight 3

Maximum 4 short bullet points.
Very simple language.
No extra text.
No explanation.
Only bullet points.

Data:
${JSON.stringify(rides)}
`;




    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error(error);
    return "Unable to generate insights at the moment.";
  }
}
