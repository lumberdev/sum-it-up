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
            <SumItUpLogo className="w-[5.2rem] md:w-[8.2rem] [&_path]:fill-white [&_path]:md:fill-primary" />
          </div>
          <div className="hidden flex-1 md:block">
            <ResultPageContentToggler
              resultPageContent={resultPageContent}
              setResultPageContent={setResultPageContent}
            />
          </div>
          <div className="relative flex-1 text-right">
            <button
              className="mx-auto inline-flex h-[3.4rem] min-w-[11.1rem] items-center justify-center rounded-full border-2 border-white bg-transparent text-sm font-bold uppercase text-white md:h-20 md:min-w-[18rem] md:border-primary md:text-lg md:text-primary"
              type="button"
              onClick={() => handleNewSearchBtnClick()}
            >
              New Summary
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default ResultPageHeader;
