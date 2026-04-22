"use server";
import { streamText, gateway, type ModelMessage, type LanguageModel } from "ai";
import { createStreamableValue } from "@ai-sdk/rsc";

const aiModel: LanguageModel = gateway("openai/gpt-5.2-codex");

export async function continueConversation(messages: ModelMessage[]) {

  if (!process.env.AI_GATEWAY_API_KEY) throw new Error("AI_GATEWAY_API_KEY not set");

  const result = await streamText({ model: aiModel, messages });
  const stream = createStreamableValue(result.textStream);
  console.log(stream.value);
  return stream.value;
}
