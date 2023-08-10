import { Configuration, OpenAIApi } from "openai";
import { getOpenAiKey } from "./get-open-ai-key";

export const checkOpenAiKeyStatus = async () => {
  try {
    const apiKey = getOpenAiKey();

    const configuration = new Configuration({
      organization: "org-FmieSceXLz3IvrwNny0WbVQn",
      apiKey,
    });
    const openai = new OpenAIApi(configuration);
    await openai.listModels();
    return true;
  } catch (e) {
    return false;
  }
};
