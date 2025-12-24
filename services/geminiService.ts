import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are an AI assistant for Abdallah Alhelo's personal portfolio website.
Abdallah is a Data Scientist & Analyst specialized in AI algorithms, database management, and statistical analysis.
He is 25 years old with 3+ years of specialization.

Key Projects & GitHub:
All projects are hosted at: https://github.com/AbdallahAlhelo/projectes-Analysis-2025

1. Bank Customer Analysis: Focused on churn risk and customer behavior using Python and Excel.
2. Spotify Trends Analysis: A deep dive into music streaming data using Jupyter Notebooks (Pandas/Seaborn).
3. Linear Regression: Predictive modeling for sales/forecasting.
4. Logistic Regression: Classification projects like credit scoring and probability prediction.

Tech stack specifics:
- Advanced Excel: Power Pivot, Solver, Macros, complex dashboards.
- Python: Pandas, Numpy, Scikit-learn, Matplotlib, Seaborn.
- SQL: Data extraction and management.
- Education: Alquds Open University.

Your goal is to answer visitor questions about Abdallah's projects, skills, and availability. 
When asked about his work, mention his specific analysis of banking and music streaming (Spotify) data and direct them to his GitHub.
Keep answers concise, professional, and friendly.
`;

export const getChatResponseStream = async (message: string) => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is missing");
    }

    if (!chatSession) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSession = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
    }

    const result = await chatSession.sendMessageStream({ message });
    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};