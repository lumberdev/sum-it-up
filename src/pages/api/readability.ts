// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { scrapeReadability } from "~/api-functions/readability/scrape-readability";
import { DocumentResponseData, ErrorMessage } from "~/types";
import { getStringOrFirst } from "~/typescript-helpers/type-cast-functions";
import { textToChunks } from "~/utils/text-to-chunks";

// site.com/api/readability?url_resource="url"&chunk_length=30
export default async function handler(req: NextApiRequest, res: NextApiResponse<DocumentResponseData | ErrorMessage>) {
  const { query, method } = req;

  const urlResource = getStringOrFirst(query.url_resource).replace(/['"]+/g, "");
  const chunkLength = +getStringOrFirst(query.chunk_length).replace(/['"]+/g, "");

  // Run function here on GET request
  if (method === "GET") {
    if (!urlResource) res.status(400).json({ message: "Please provide a valid URL", code: 400 });
    // process the GET request
    try {
      const result = await scrapeReadability(urlResource);
      if (result)
        return res.status(200).json({
          url: urlResource,
          chunkedTextContent: textToChunks(result.textContent, !isNaN(chunkLength) ? chunkLength : 2000),
          ...result,
        });

      // Handle Error if result is not valid
      return res.status(400).json({ message: "Could not retrieve parsed data for URL", code: 400 });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong while processing your request",
        code: 500,
      });
    }
  } else {
    // Handle Error if method is invalid
    return res.status(405).json({ message: "Invalid Method", code: 405 });
  }
}
