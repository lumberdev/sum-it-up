import SumItUpLogo from "../../assets/sum-it-up.svg";
import HeaderText from "../../assets/header-text.svg";
import HeaderMusic from "../../assets/header-music.svg";
import Container from "../utility-components/Container";

const InputPageHeader = ({ handleNewSearchBtnClick }: { handleNewSearchBtnClick: () => void }) => {
  return (
    <header className="flex min-h-[14rem] w-full flex-col pt-12 md:pt-16">
      <Container className="text-center">
        <div className="mx-auto flex w-full max-w-[100rem] items-end justify-between px-8 md:items-start md:px-0">
          <div className="relative w-[5.8rem] sm:w-[8rem] md:top-10 md:w-[14.5rem]">
            <HeaderText className="inline-block" />
          </div>
          <div className="w-[11.6rem] cursor-pointer md:w-[14rem]" onClick={handleNewSearchBtnClick}>
            <SumItUpLogo className="w-full" />
          </div>
          <div className="relative w-[5.8rem] sm:w-[8rem] md:top-10 md:w-[14.5rem]">
            <HeaderMusic />
          </div>
        </div>
        <div className="mx-auto mt-7 px-12 text-base font-bold text-dark md:mt-0 md:max-w-[70%] md:text-xl lg:max-w-none">
          Get an instant summary of any text, article content (URL) or song for free.
        </div>
      </Container>
    </header>
  );
};

export default InputPageHeader;
