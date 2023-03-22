import { useMDXComponents } from "~/mdx-components";
import ReactMarkdown from "react-markdown";

const MarkdownComponent = ({ textContent = "forest" }: { textContent: string }) => {
  const output = useMDXComponents({ textContent });

  return <ReactMarkdown components={output}>{textContent}</ReactMarkdown>;
};

export default MarkdownComponent;
