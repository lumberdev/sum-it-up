import Link from "next/link";
import Container from "./utility-components/Container";
const Footer = () => {
  return (
    <footer className="bg-lightest pt-3 pb-7">
      <Container className="min-h-[9.75rem] md:flex">
        <div className="mb-8 flex flex-1 flex-col items-center justify-between md:mb-0 md:items-start">
          <div className="text-heading3 text-dark">Sum It Up</div>
          <div className="text-paragraph text-dark">© Lumber LLC. All rights reserved</div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-between text-paragraph md:items-end">
          <div>
            Made by
            <span className="font-bold"> Lumber</span>
          </div>
          <div className="flex justify-end gap-10">
            <Link href="/">Privacy</Link>
            <Link href="/">Terms</Link>
            <Link href="/">Accessibility</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
