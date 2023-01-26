import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

// Based on Dennis Heihoff's contribution

const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const googleWebcachePrefix =
  "https://webcache.googleusercontent.com/search?q=cache:";

const getHTML = async (url: string): Promise<string> => {
  let res: Response;
  try {
    // Attempt to get the required data from the google webcache version
    // (https://kinsta.com/blog/google-cache/)
    res = await fetch(googleWebcachePrefix + url, {
      method: "get",
      headers: { "User-Agent": userAgent },
    });

    if (res.status === 404) {
      // If googleusercontent cache search fails, use the raw url version.
      res = await fetch(url, {
        method: "get",
        headers: { "User-Agent": userAgent },
      });
      if (res.status === 200) {
        return await res.text();
      }
    }

    if (res.ok) {
      return await res.text();
    } else {
      throw Error("Unable to parse url");
    }
  } catch (error) {
    throw error;
  }
};

export const scrapeReadability = async (url: string) => {
  const html = await getHTML(url);

  if (html) {
    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();
    return article;
  }

  throw Error("Unable to process request");
};
