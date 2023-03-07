// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import { summaryClientSE } from "~/abstractions/open-ai-class/server";
import { CustomRequest, ErrorMessage, RequestBody, ResponseType } from "~/types";
/**
 * Make a POST request:
 * {
 * url: string
 * text: string
 * type: string
 * wordLimit: number
 * }
 */

// byline: any;
// title: any;
// dir: any;
// url: any;
// meaning: string;
// mood: string;
// moodColor: string;

export default async function handler(
  req: CustomRequest<RequestBody>,
  res: NextApiResponse<ErrorMessage | ResponseType>,
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

  try {
    const openAiResponse = await summaryClientSE.fetchSummary({ text, url, wordLimit, type });
    return res.status(200).json({ ...openAiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Request errored out", code: 500 });
  }
}

// export const config = {
//   type: "experimental-background",
// };
