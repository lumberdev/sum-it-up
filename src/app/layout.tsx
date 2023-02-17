import "./globals.css";
import Footer from "~/components/Footer";
import ReactQueryWrapper from "~/components/utility-components/ReactQueryWrapper";
import * as snippet from "@segment/snippet";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const loadSegment = () => {
    const options = {
      apiKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
    };
    if (process.env.NEXT_PUBLIC_NODE_ENV) return snippet.max(options);
    else return snippet.min(options);
  };

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <Script id="segmentScript" dangerouslySetInnerHTML={{ __html: loadSegment() }} strategy="lazyOnload" />
      <body className="flex flex-col justify-between font-splineSans text-base">
        <ReactQueryWrapper>
          <main className="flex-1 pb-[5rem]">{children}</main>
          <Footer />
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
