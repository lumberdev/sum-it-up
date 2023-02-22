import { ReactNode } from "react";

const SummarizeButton = ({ children, className = "" }: Props) => {
  return (
    <button
      className={`mx-auto flex h-20 min-w-[14rem] items-center justify-center rounded-full bg-primary text-base font-bold uppercase text-white transition duration-300 hover:bg-primary/95 hover:ring-2 md:h-24 md:text-lg ${className}`}
      type="submit"
    >
      {children}
    </button>
  );
};

type Props = {
  children: ReactNode;
  className?: string;
};

export default SummarizeButton;
