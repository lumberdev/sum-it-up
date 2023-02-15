import React from "react";
import Container from "../../utility-components/Container";

const OriginalContent = ({ content, songDetails }: { content: string; songDetails: string }) => {
  return (
    <Container>
      <div className="mx-auto mb-12 max-w-[75rem] rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
        {songDetails || content}
      </div>
    </Container>
  );
};

export default OriginalContent;
