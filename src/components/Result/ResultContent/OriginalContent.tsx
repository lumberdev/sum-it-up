import React from "react";
import Container from "../../utility-components/Container";
import { ContentType } from "~/types";

const OriginalContent = ({
  content,
  songDetails,
  contentType,
}: {
  content: string;
  songDetails: string;
  contentType: ContentType | null;
}) => {
  const capitalize = (sentence: string) => {
    return sentence.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <Container>
      <article className=" mx-auto mb-12 max-w-[75rem] rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
        {contentType === "song" && <h3 className="mb-8 text-xl font-bold">{capitalize(songDetails ?? "")}</h3>}
        <section className="render-span-block" dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </Container>
  );
};

export default OriginalContent;
