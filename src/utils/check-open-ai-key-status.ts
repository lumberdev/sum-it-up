import { Configuration, OpenAIApi } from "openai";

export const checkOpenAiKeyStatus = async (apiKey: string) => {
  try {
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
