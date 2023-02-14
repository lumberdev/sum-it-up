type SummaryLengthSliderPropType = {
  summaryLength: string;
  setSummaryLength: (length: string) => void;
};

const SummaryLengthSlider = ({ summaryLength, setSummaryLength }: SummaryLengthSliderPropType) => {
  return (
    <div className="mt-[7rem] flex flex-col items-center justify-center">
      <label htmlFor="summary-length" className="mb-6 font-bold text-dark">
        Length of the summary in words:
      </label>
      <input
        type="range"
        className="range-sm mb-6 flex h-1 w-full cursor-pointer appearance-none items-center rounded-lg bg-medium p-0 focus:shadow-none dark:bg-primary"
        min="100"
        max="300"
        step="100"
        list="markers"
        value={summaryLength}
        id="summary-length"
        onChange={(event) => {
          setSummaryLength(event.target.value);
        }}
      />

      <div className="flex w-full justify-between">
        <div>Shortest</div>
        <div>Short</div>
        <div>Short-ish</div>
      </div>
    </div>
  );
};

export default SummaryLengthSlider;
