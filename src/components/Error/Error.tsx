import Container from "../utility-components/Container";
import ResultPageHeader from "../Result/ResultPageHeader";

const Error = ({
  handleNewSearchBtnClick,
  errorMessage,
}: {
  handleNewSearchBtnClick: () => void;
  errorMessage: string;
}) => {
  return (
    <>
      <ResultPageHeader handleNewSearchBtnClick={handleNewSearchBtnClick} />
      <Container>
        <div className="mx-auto my-8 max-w-[75rem] animate-fadeIn rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
          <p className={`text-[1.5rem] font-bold ${errorMessage.length ? "text-left" : "text-center"}`}>
            {errorMessage}
          </p>
        </div>
      </Container>
    </>
  );
};

Error.defaultProps = {
  errorMessage: "Sorry, Something went wrong",
};

export default Error;
