import { Configuration, OpenAIApi } from "openai";
import {
  generatePromptArticle,
  generatePromptSong,
  generatePromptText,
} from "~/utlis/generatePrompt";
import { ContentType, DataType, SongType } from "~/types";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type OpenAiRequestProps = {
  chunkedTextContent?: Array<string>;
  text?: string;
  wordLimit: number;
  type: ContentType;
};
export async function openAIRequest(
  props: OpenAiRequestProps
): Promise<DataType | SongType> {
  if (!configuration.apiKey) {
    throw new Error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
  }
  let textContent = "";
  const wordLimit = props.wordLimit || 100;

  switch (props.type) {
    case "text":
      if (!props.text || !props.text.length)
        throw new Error("no data provided");
      textContent = props.text ?? "";
      break;
    case "song":
    case "article":
      if (!props.chunkedTextContent || !props.chunkedTextContent.length)
        throw new Error("no data provided");
      textContent = props.chunkedTextContent?.[0];
      break;
    default:
      throw new Error("invalid type");
  }

  const promptText =
    props.type === "text"
      ? generatePromptText(textContent, wordLimit)
      : props.type === "article"
      ? generatePromptArticle(textContent, wordLimit)
      : props.type === "song" && generatePromptSong(textContent, wordLimit);

  if (!promptText) {
    throw new Error("Prompt is empty");
  }

  try {
    // Using Mockdata for testing
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promptText,
      max_tokens: 1000,
      temperature: 0,
    });
    console.log(typeof completion.data, completion.data, textContent);
    if (!completion.data.choices?.[0].text)
      throw new Error("OpenAI did not produce a response");

    let parsedResponseData = {
      meaning: "",
      mood: "",
      moodColor: "",
      keyPoints: [],
      bias: "",
      tone: "",
      summary: "",
      trust: undefined,
    };
    try {
      parsedResponseData = await JSON.parse(completion.data.choices[0].text);
    } catch (error) {
      throw new Error("Invalid JSON response from OpenAi");
    }
    if (props.type === "song") {
      const responseObject = {
        meaning: parsedResponseData?.meaning,
        mood: parsedResponseData?.mood,
        moodColor: parsedResponseData?.moodColor,
      };
      // console.log(completion.data);
      return responseObject;
    }
    const responseObject = {
      keyPoints: parsedResponseData?.keyPoints,
      bias: parsedResponseData?.bias,
      tone: parsedResponseData?.tone,
      summary: parsedResponseData?.summary,
      trust: parsedResponseData?.trust,
    };
    // console.log(completion.data);
    return responseObject;
  } catch (error) {
    if (error) {
      throw error;
    }
    throw new Error("An error occurred during your request.");
  }
}
