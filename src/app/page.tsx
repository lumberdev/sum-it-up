// this seems like an open issue, search params returned empty object, so had to force-dynamic : https://github.com/vercel/next.js/issues/43077
export const dynamic='force-dynamic';

import ClientPage from "./clientPage";

export default function Page({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  return <ClientPage searchParams={searchParams} />;
}
