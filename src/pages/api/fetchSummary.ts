// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ContentType, DataType, ErrorMessage, SongType } from "~/types";
import { openAIRequest } from "~/api-functions/open-ai-request";

/**
 * Make a POST request:
 * {
 * url: string
 * text: string
 * type: string
 * wordLimit: number
 * }
 */

type RequestBody = {
  url: string;
  text?: string;
  type: ContentType;
  wordLimit: number;
};

interface CustomRequest<T> extends NextApiRequest {
  body: T;
}
// byline: any;
// title: any;
// dir: any;
// url: any;
// meaning: string;
// mood: string;
// moodColor: string;
export type ResponseData = {
  openAiResponse: DataType | SongType | null;
};

export default async function handler(
  req: CustomRequest<RequestBody>,
  res: NextApiResponse<ErrorMessage | ResponseData>
) {
  const { body, method } = req;
  if (method !== "POST")
    return res.status(405).json({
      message: "Please make a POST request with a valid body",
      code: 405,
    });
  const { url, type, text, wordLimit } = body;

  if (type === "text" && (!text || text.length <= 0))
    return res.status(400).json({
      message: "Please pass text value for this type of request",
      code: 400,
    });
  if ((type === "song" || type === "article") && !url)
    return res.status(400).json({
      message: "Please pass url value for this type of request",
      code: 400,
    });

  if (!type || !["song", "text", "article"].includes(type)) {
    return res.status(400).json({ message: "Invalid type", code: 400 });
  }
  let openAiResponse = null;
  try {
    if (type === "text" && typeof text === "string")
      openAiResponse = await callWithText(text, wordLimit, type);
    if (type === "song" || type === "article")
      openAiResponse = await callWithUrl(url, wordLimit, type);
    return res.status(200).json({ openAiResponse });
  } catch (error) {
    res.status(500).json({ message: "Request errored out", code: 500 });
  }
}
async function callWithText(
  text: string,
  wordLimit: number,
  type: ContentType
) {
  try {
    const response = await openAIRequest({
      text,
      wordLimit,
      type,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
async function callWithUrl(
  url: string,
  wordLimit: number,
  type: "song" | "article" | "text"
) {
  try {
    const CHUNK_LENGTH = 1000;
    // await fetchRetry(`/readability?url_resource=${url}`, 100, 3)
    const innerResponse = await fetch(
      `http://localhost:3000/api/readability?url_resource="${url}"&chunk_length=${CHUNK_LENGTH}`
    );
    // if res is good, process in openAPI
    if (innerResponse.ok) {
      const json = await innerResponse.json();
      const body = {
        type,
        chunkedTextContent: json.chunkedTextContent ?? [""],
        wordLimit,
      };
      const response = await openAIRequest(body);

      return {
        ...response,
        byline: json.byline,
        title: json.title,
        dir: json.dir,
        url: json.url,
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  throw new Error("Something went wrong");
}

async function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

// If we have failures with the URL parsing, use this
function fetchRetry(
  url: string,
  delay: number,
  tries: number
): Promise<Response | Error> {
  function onError(error: Error) {
    let triesLeft = tries - 1;
    if (!triesLeft) throw error;
    return wait(delay).then(() => fetchRetry(url, delay, triesLeft));
  }
  return fetch(url).catch((error: Error) => onError(error));
}
