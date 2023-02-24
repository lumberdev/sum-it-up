// this seems like an open issue, search params returned empty object, so had to force-dynamic : https://github.com/vercel/next.js/issues/43077
export const dynamic = "force-dynamic";

import LZString from "lz-string";
import { getStringOrFirst } from "~/typescript-helpers/type-cast-functions";
import ClientPage from "./clientPage";

export default function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const decompressedParams = {
    original: LZString.decompressFromEncodedURIComponent(getStringOrFirst(searchParams?.original)) ?? "",
    result: LZString.decompressFromEncodedURIComponent(getStringOrFirst(searchParams?.result)) ?? "",
  };

  return <ClientPage searchParams={decompressedParams} />;
}
