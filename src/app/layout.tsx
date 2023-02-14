import "./globals.css";
import Footer from "~/components/Footer";
import ReactQueryWrapper from "~/components/utility-components/ReactQueryWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="flex flex-col justify-between font-splineSans text-base">
        <ReactQueryWrapper>
          <main className="flex-1">{children}</main>
          <Footer />
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
