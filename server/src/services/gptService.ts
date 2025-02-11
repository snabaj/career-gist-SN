import fetch, { Response } from "node-fetch";

const CAREER_GIST_URL : string = process.env.CAREER_GIST_URL ?? '';
const CAREER_GIST_API : string = process.env.CAREER_GIST_API ?? '';

export const generateEnhancedJobData = async (jobData: any) => {
  try {
    const prompt = `Give a detailed, but concise, job description that is 500 character or less, that also gives insight into salary and benefits:\n${JSON.stringify(jobData)}`;

    const response : Response = await fetch(CAREER_GIST_URL ?? "", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CAREER_GIST_API}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      })
    });

    if (!response.body) {
      throw new Error(`OpenAI API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return { ...jobData, enhancement: data.choices[0]?.message?.content || "No enhancement available." };
  } catch (error) {
    console.error("❌ OpenAI API error:", error);
    return jobData;
  }
};
