import React from "react";
import Container from "../../utility-components/Container";
import { getStringOrFirst } from "~/typescript-helpers/type-cast-functions";
import { ContentType } from "~/types";

const OriginalContent = ({
  content,
  songDetails,
  contentType,
}: {
  content: string | string[];
  songDetails: string;
  contentType: ContentType | null;
}) => {
  return (
    <Container>
      {contentType === "article" && (
        <div className="mx-auto mb-12 max-w-[75rem] animate-fadeIn rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
          <a href={getStringOrFirst(content)} target="_blank" className="hover:underline" rel="noreferrer">
            {getStringOrFirst(content)}
          </a>
        </div>
      )}
      {contentType === "song" && (
        <div className="mx-auto mb-12 max-w-[75rem] rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
          {songDetails || getStringOrFirst(content)}
        </div>
      )}
      {contentType === "text" && (
        <div className="mx-auto mb-12 max-w-[75rem] rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
          {getStringOrFirst(content)}
        </div>
      )}
    </Container>
  );
};

export default OriginalContent;
