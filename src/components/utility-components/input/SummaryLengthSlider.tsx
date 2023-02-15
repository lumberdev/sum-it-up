type SummaryLengthSliderPropType = {
  summaryLength: string;
  setSummaryLength: (length: string) => void;
};

const SummaryLengthSlider = ({
  summaryLength,
  setSummaryLength,
  customLength,
  setCustomLength,
}: {
  summaryLength: string;
  setSummaryLength: (length: string) => void;
  customLength: string;
  setCustomLength: (length: string) => void;
}) => {
  const options = [
    { name: "Shortest", align: "self-start" },
    { name: "Short", align: "self-center" },
    { name: "Short-ish", align: "self-center" },
    { name: "Custom", align: "self-end" },
  ];
  return (
    <div className="mt-[7rem] mb-[5rem] flex flex-col items-center justify-center">
      <label htmlFor="summary-length" className="mb-[3rem] font-bold text-primary">
        <div className="block md:hidden">LENGTH OF SUMMARY</div>
        <div className="hidden md:block">LENGTH OF SUMMARY IN WORDS:</div>
      </label>
      <div className="relative w-full max-w-[42rem]">
        <input
          type="range"
          className="range-sm z-1 mb-6 flex h-[.3rem] w-full cursor-pointer appearance-none items-center rounded-lg bg-primary p-0 focus:shadow-none"
          min="100"
          max="400"
          step="100"
          list="markers"
          value={summaryLength}
          id="summary-length"
          onChange={(event) => {
            setSummaryLength(event.target.value);
            setCustomLength("");
          }}
        />
        <div className="absolute -top-[.8rem] -z-10 flex w-full justify-between text-sm font-semibold text-primary md:text-base">
          {options.map((option) => (
            <div
              className={`flex flex-col ${option.name === "Short-ish" ? "ml-[1.8rem]" : ""}`}
              key={`idx-${option.name}`}
            >
              <div className={`h-7 w-7 ${option.align} rounded-full bg-primary`}></div>
              <div className="mt-[2rem] md:mt-[1rem]">{option.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          className={`w-100 mt-[6.25rem] h-20 w-80 rounded-full border-[1px] border-solid border-primary p-[.625rem] text-center font-[.875rem] text-primary ${
            Number(summaryLength) > 300 ? "visible" : "invisible"
          }`}
          value={customLength}
          placeholder="Enter number here"
          id="custom-summary-length"
          onChange={(event) => {
            setCustomLength(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SummaryLengthSlider;
