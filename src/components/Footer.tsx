import Link from "next/link";
import Container from "./utility-components/Container";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="fixed left-0 bottom-0 w-full bg-dark text-white">
      <Container className="mx-0 flex h-[theme(height.footerMobile)] flex-col items-center justify-center gap-[1rem] px-11 md:h-[theme(height.footerDesktop)] md:flex-row md:justify-between md:px-20">
        <Link href="https://lumber.dev/" target="_blank" rel="noreferrer">
          <div className="flex items-center">
            Made by
            <Image
              alt="Lumber Logo"
              src="/assets/lumber_logo.svg"
              width="70"
              height="0"
              className="relative bottom-0.5 ml-4"
            />
          </div>
        </Link>
        <div className="my-[-1rem] text-[1rem] min-[350px]:hidden md:mr-[5rem] md:text-paragraph">
          © Lumber LLC. All rights reserved
        </div>
        <div className="flex items-center justify-end">
          <div className="mr-[3rem] hidden text-[1rem] min-[350px]:block md:mr-[5rem] md:text-paragraph">
            © Lumber LLC. All rights reserved
          </div>
          <div className="flex justify-end gap-[1rem] text-[1rem] underline md:gap-[3rem] md:text-paragraph">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
