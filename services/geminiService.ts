
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const explainDecision = async (personData: any, environment: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following face recognition decision:
        Subject: ${personData.personName}
        Confidence: ${personData.confidence * 100}%
        Environment: ${environment}
        Emotion Detected: ${personData.emotion}
        Status: ${personData.status}
        
        Provide a professional cybersecurity/security expert reasoning for this decision in 3 short bullet points.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI explanation. System logs indicate standard verification procedure.";
  }
};

export const getSystemInsights = async (metrics: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the Aegis AI Architect. Analyze these real-time system metrics and provide a 1-sentence optimization suggestion:
        - CPU Load: ${metrics.cpu}%
        - GPU Temp: ${metrics.gpuTemp}°C
        - Avg Latency: ${metrics.latency}ms
        - Active Cameras: ${metrics.cameras}
        - Liveness Success Rate: 99.8%`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    return "Optimize batch sizes for GPU inference to maintain <50ms latency.";
  }
};
