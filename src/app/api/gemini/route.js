import { NextResponse } from "next/server";

export async function POST(req) {
  const { message } = await req.json();

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": "AIzaSyBd7HHJJt6fXzwHfxlu5FVFuozA38Dc47E", 
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
