import "./globals.css";
import Footer from "~/components/Footer";
import ReactQueryWrapper from "~/components/utility-components/ReactQueryWrapper";
import * as snippet from "@segment/snippet";
import Script from "next/script";

export const metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "Sum It Up! | The free AI Summary Tool | Texts, Articles, Songs",
    description:
      "Use AI to summarize texts, URLs and even song lyrics in seconds. Save time and get the gist of any content effortlessly. Try it now.",
    url: process.env.NEXT_HOST_URL,
    images: [
      {
        url: `/shareImage.png`,
        width: 800,
        height: 600,
      },
    ],
  },
  robots: {
    index: true,
  },
};

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
