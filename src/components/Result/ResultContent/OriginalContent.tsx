import React from "react";
import Container from "../../utility-components/Container";
import { getStringOrFirst } from "~/typescript-helpers/type-cast-functions";

const OriginalContent = ({ content, songDetails }: { content: string | string[]; songDetails: string }) => {
  return (
    <Container>
      <div className="mx-auto mb-12 max-w-[75rem] rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
        {songDetails || getStringOrFirst(content)}
      </div>
    </Container>
  );
};

export default OriginalContent;
