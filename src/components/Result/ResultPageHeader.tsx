import SumItUpLogo from "../../assets/sum-it-up.svg";
import Container from "../utility-components/Container";
import { ResultPageContentType } from "~/types";
import ResultPageContentToggler from "../utility-components/result/ResultPageContentToggler";

type ResultPageHeaderPropType = {
  resultPageContent: ResultPageContentType;
  setResultPageContent: (type: ResultPageContentType) => void;
  handleNewSearchBtnClick: () => void;
};
const ResultPageHeader = ({
  resultPageContent,
  setResultPageContent,
  handleNewSearchBtnClick,
}: ResultPageHeaderPropType) => {
  return (
    <header className="w-full py-8 md:py-10">
      <Container className="text-center">
        <div className="mx-auto flex w-full items-center justify-between rounded-full bg-primary p-[1.4rem] md:rounded-none md:bg-transparent md:p-0">
          <div className="relative flex-1">
            <SumItUpLogo className="main-logo w-[5.2rem] md:w-[8.2rem]" />
          </div>
          <div className="hidden flex-1 md:block">
            <ResultPageContentToggler
              resultPageContent={resultPageContent}
              setResultPageContent={setResultPageContent}
            />
          </div>
          <div className="relative flex-1 text-right">
            <button
              className="group relative mx-auto inline-flex h-[3.4rem] min-w-[11.1rem] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-transparent px-5 py-3  text-white md:h-20 md:min-w-[18rem] md:border-primary  md:text-primary"
              type="button"
              onClick={() => handleNewSearchBtnClick()}
            >
              <span className="absolute top-0 left-0 -mt-1 hidden h-[22rem] w-[22rem] -translate-x-[25rem] -translate-y-[12rem] rotate-45 bg-primary opacity-100 transition-all duration-[400ms] ease-in-out group-hover:-translate-x-8 md:inline"></span>
              <span className="relative w-full text-sm font-bold uppercase transition-colors duration-200 ease-in-out md:text-lg md:text-primary md:group-hover:text-white">
                New Summary
              </span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default ResultPageHeader;
