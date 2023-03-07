import "server-only";
// this seems like an open issue, search params returned empty object, so had to force-dynamic : https://github.com/vercel/next.js/issues/43077
export const dynamic = "force-dynamic";

import readability from "~/api-functions/readability";
import { getStringOrFirst } from "~/typescript-helpers/type-cast-functions";
import ClientPage from "./clientPage";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/;
  // Fetch readability data in server and pass to client side
  const fetchReadabilityOnLoad = async () => {
    const original = getStringOrFirst(searchParams?.original).trim();
    if (urlRegex.test(original)) {
      try {
        const json = await readability(original, 500);
        return json.content;
      } catch (e) {
        console.log(e);
        return original;
      }
    }
    return original;
  };

  const parsedSearchParams = {
    original: await fetchReadabilityOnLoad(),
    result: getStringOrFirst(searchParams?.result),
  };

  return <ClientPage searchParams={parsedSearchParams} />;
}
