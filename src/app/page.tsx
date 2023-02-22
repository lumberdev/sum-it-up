// this seems like an open issue, search params returned empty object, so had to force-dynamic : https://github.com/vercel/next.js/issues/43077
export const dynamic = "force-dynamic";

import ClientPage from "./clientPage";
import About from "~/components/About";
import { isValidUrlWithEncodedState } from "~/utils/isValidUrlWithEncodedState";

export default function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  return (
    <>
      <ClientPage searchParams={searchParams} />
      {/* Hide about page in the results page */}
      {!isValidUrlWithEncodedState(searchParams) && <About />} 
    </>
  );
}
