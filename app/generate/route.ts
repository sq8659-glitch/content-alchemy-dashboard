import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { videoUrl } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(`Analyze this video: ${videoUrl} and provide a social media post, Twitter thread, and Instagram script.`);
    const response = await result.response;
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    return NextResponse.json({ text: "Error generating content. Please check your API key." }, { status: 500 });
  }
}

