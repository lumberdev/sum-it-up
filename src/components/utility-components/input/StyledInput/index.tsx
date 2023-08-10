import SummarizeButton from "~/components/utility-components/input/SummarizeButton";

const StyledInputWithSubmit = ({
  buttonTitle,
  ...restProps
}: { buttonTitle: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center md:flex-row">
      <input
        className="mb-8 flex h-20 items-center justify-center rounded-full border-2 border-primary px-4 pl-6 font-medium transition-all duration-200 placeholder:font-normal placeholder:!text-dark/70 focus:outline-none focus:ring-2 focus:ring-inset md:mb-0 md:h-[5.7rem] md:flex-1 md:rounded-r-none"
        {...restProps}
      />
      <SummarizeButton className="md:!h-[5.7rem] md:rounded-l-none ">{buttonTitle}</SummarizeButton>
    </div>
  );
};

export default StyledInputWithSubmit;
