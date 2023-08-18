import OpenAI from "openai";

export const checkOpenAiKeyStatus = async (apiKey: string) => {
  try {
    const openai = new OpenAI({
      apiKey,
    });
    await openai.models.list();
    return true;
  } catch (e) {
    return false;
  }
};
