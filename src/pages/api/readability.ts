// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { scrapeReadability } from "~/api-functions/scrape-readability";
import { getStringOrFirst } from "~/typescript-helpers/type-cast-functions";

type ResponseData = {
  url: string;
  title: string;
  byline: string;
  dir: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  siteName: string;
};

type ErrorMessage = {
  message: string;
};
// site.com/?url_resource="url"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorMessage>
) {
  const { query, method } = req;
  const urlResource = getStringOrFirst(query.url_resource).replace(
    /['"]+/g,
    ""
  );

  // Run function here on GET request
  if (method === "GET") {
    if (!urlResource)
      res.status(400).json({ message: "Please provide a valid URL" });
    // process the GET request
    try {
      const result = await scrapeReadability(urlResource);
      if (result) return res.status(200).json({ url: urlResource, ...result });

      // Handle Error if result is not valid
      return res
        .status(400)
        .json({ message: "Could not retrieve parsed data for URL" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong while processing your request",
      });
    }
  } else {
    // Handle Error if method is invalid
    return res.status(405).json({ message: "Invalid Method" });
  }
}
