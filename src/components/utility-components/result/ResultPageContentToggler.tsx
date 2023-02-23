import { ResultPageContentType } from "~/types";

type ResultPageContentTogglerPropType = {
  resultPageContent: ResultPageContentType;
  setResultPageContent: (length: ResultPageContentType) => void;
};
const ResultPageContentToggler = ({ resultPageContent, setResultPageContent }: ResultPageContentTogglerPropType) => {
  return (
    <div className="relative mx-auto inline-flex h-16 w-full max-w-[19rem] flex-1 items-center justify-center rounded-full bg-primary p-2 text-white md:h-[4.5rem] md:max-w-[26rem]">
      <button
        className={`z-10 h-full flex-1 rounded-full text-sm font-bold uppercase transition ${
          resultPageContent === "summary" && "  text-primary"
        } ${resultPageContent !== "summary" && "hover:bg-white/10"}`}
        onClick={() => setResultPageContent("summary")}
      >
        Summary
      </button>
      <button
        className={`z-10 h-full flex-1 rounded-full text-sm font-bold uppercase transition ${
          resultPageContent === "original" && "  text-primary"
        } ${resultPageContent !== "original" && "hover:bg-white/10"}`}
        onClick={() => setResultPageContent("original")}
      >
        Original
      </button>
      <span
        className={`z-1 absolute left-2 right-auto h-[calc(100%-1rem)] w-[calc(50%-0.5rem)] rounded-full bg-white transition-all ease-in-out ${
          resultPageContent === "original" && "left-1/2 right-2"
        }`}
      ></span>
    </div>
  );
};

export default ResultPageContentToggler;
