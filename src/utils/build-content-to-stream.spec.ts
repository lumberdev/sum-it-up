import { readability_article } from "~/test-utils/mocks/readabilityDataMock";
import { buildContentToStream } from "./build-content-to-stream";

jest.mock("~/query/fetch-article-data", () => {
  return {
    fetchArticleData: () => readability_article,
  };
});

jest.mock("./open-ai-fetch", () => {
  return { getSummaryFromUrl: () => "Summarized Content" };
});

describe("Expect buildContentToStream to work correctly", () => {
  it("returns correct objects", async () => {
    expect(await buildContentToStream("article", readability_article.url, "")).toMatchObject({
      mappedReadabilityObject: {
        type: "article",
        inputCharacterLength: 3,
        outputCharacterLength: 0,
        byline: readability_article.byline,
        title: readability_article.title,
        dir: readability_article.dir,
        content: readability_article.content,
        url: readability_article.url,
        markdown: "",
      },
      textContent: "Summarized Content",
    });
  });
});
