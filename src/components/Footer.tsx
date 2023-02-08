import Link from "next/link";
import Container from "./utility-components/Container";
const Footer = () => {
  return (
    <footer className="bg-dark pt-3 pb-7 text-white">
      <Container className="min-h-[9.75rem] md:flex">
        <div className="mb-8 flex flex-1 flex-col items-center justify-between md:mb-0 md:items-start">
          <div className="text-heading3">Sum It Up</div>
          <div className="hidden text-paragraph md:block">© Lumber LLC. All rights reserved</div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-between text-paragraph md:items-end">
          <div className="flex items-center">
            Made by
            <span className="relative bottom-0.5 mr-1 ml-2 inline-block h-4 w-4 rounded-full bg-[#FFCC08]"></span>
            <span className="font-bold"> Lumber</span>
          </div>
          <div className="flex justify-end gap-10 py-4 md:py-0">
            <Link href="/">Privacy</Link>
            <Link href="/">Terms</Link>
            <Link href="/">Accessibility</Link>
          </div>
          <div className="text-paragraph text-dark md:hidden">© Lumber LLC. All rights reserved</div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
