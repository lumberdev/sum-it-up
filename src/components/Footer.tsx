import Link from "next/link";
import Container from "./utility-components/Container";
const Footer = () => {
  return (
    <footer className="fixed left-0 bottom-0 w-full bg-dark text-white">
      <Container className="mx-0 flex h-[7.9rem] flex-col items-center justify-center gap-[1rem] px-11 md:h-[5rem] md:flex-row md:justify-between md:px-20">
        <div className="flex items-center">
          Made by
          <span className="relative bottom-0.5 mr-1 ml-2 inline-block h-[1.4rem] w-[1.4rem] rounded-full bg-[#FFCC08]"></span>
          <span className="font-[Roboto] font-bold"> Lumber</span>
        </div>
        <div className="my-[-1rem] text-[1rem] min-[350px]:hidden md:mr-[5rem] md:text-paragraph">
          © Lumber LLC. All rights reserved
        </div>
        <div className="flex items-center justify-end">
          <div className="mr-[3rem] hidden text-[1rem] min-[350px]:block md:mr-[5rem] md:text-paragraph">
            © Lumber LLC. All rights reserved
          </div>
          <div className="flex justify-end gap-[1rem] text-[1rem] underline md:gap-[3rem] md:text-paragraph">
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
