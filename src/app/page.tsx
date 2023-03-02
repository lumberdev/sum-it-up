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
  const parsedSearchParams = {
    original: getStringOrFirst(searchParams?.original),
    result: getStringOrFirst(searchParams?.result),
    songDetails: getStringOrFirst(searchParams?.songDetails),
  };

  return <ClientPage searchParams={parsedSearchParams} />;
}
