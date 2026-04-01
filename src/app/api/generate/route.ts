import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
function getClient() { return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "", baseURL: "https://api.deepseek.com/v1" }); }

export async function POST(req: NextRequest) {
  try {
    const { niche, subscriberCount, goal, curationCriteria } = await req.json();
    const prompt = `Curate newsletter content recommendations:\nNewsletter Niche: ${niche || "Technology and startups"}\nSubscriber Count: ${subscriberCount || "Small to medium audience"}\nNewsletter Goal: ${goal || "Inform, engage, and grow readership"}\nCuration Criteria: ${curationCriteria || "Quality, relevance, variety"}\n\nProvide: 5 recommended content sources/links, 3 topic themes for next issue, a newsletter structure template, and sample intro/outro copy.`;
    const completion = await getClient().chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], max_tokens: 2000, temperature: 0.6 });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || "No output." });
  } catch (e) { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
