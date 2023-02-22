import { ResultPageContentType } from "~/types";

type ResultPageContentTogglerPropType = {
  resultPageContent: ResultPageContentType;
  setResultPageContent: (length: ResultPageContentType) => void;
};
const ResultPageContentToggler = ({ resultPageContent, setResultPageContent }: ResultPageContentTogglerPropType) => {
  return (
    <div className="mx-auto inline-flex h-16 w-full max-w-[19rem] flex-1 items-center justify-center rounded-full bg-primary p-2 text-white md:h-[4.5rem] md:max-w-[26rem]">
      <button
        className={`h-full flex-1 rounded-full text-sm font-bold uppercase transition ${
          resultPageContent === "summary" && " bg-white text-primary"
        } ${resultPageContent !== "summary" && "hover:bg-white/10"}`}
        onClick={() => setResultPageContent("summary")}
      >
        Summary
      </button>
      <button
        className={`h-full flex-1 rounded-full text-sm font-bold uppercase transition ${
          resultPageContent === "original" && " bg-white text-primary"
        } ${resultPageContent !== "original" && "hover:bg-white/10"}`}
        onClick={() => setResultPageContent("original")}
      >
        Original
      </button>
    </div>
  );
};

export default ResultPageContentToggler;
