import { ReactNode } from "react";

const Container = ({ children, className = "" }: Props) => {
  return <div className={`mx-auto w-full max-w-[144rem] px-8 sm:px-20 ${className}`}>{children}</div>;
};

type Props = {
  children: ReactNode;
  className?: string;
};

export default Container;
