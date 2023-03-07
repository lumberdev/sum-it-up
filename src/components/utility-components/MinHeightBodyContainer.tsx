import { ReactNode } from "react";

const MinHeightBodyContainer = ({ children }: Props) => {
  return (
    <div className="min-h-[calc(100vh-theme(height.footerMobile))] md:min-h-[calc(100vh-theme(height.footerDesktop))]">
      {children}
    </div>
  );
};

type Props = {
  children: ReactNode;
};

export default MinHeightBodyContainer;
