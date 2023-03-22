import { PropsWithChildren } from "react";

function H1({ children }: PropsWithChildren) {
  return <h1 className="text-lg font-bold">{children}</h1>;
}

function H2({ children }: PropsWithChildren) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

function H3({ children }: PropsWithChildren) {
  return <h3 className="pt-8 text-lg font-bold">{children}</h3>;
}

function H4({ children }: PropsWithChildren) {
  return <h4 className="pt-8 text-lg font-bold">{children}</h4>;
}

function LIST({ children }: PropsWithChildren) {
  return <ul className="my-8 list-disc px-6 text-base leading-6 md:leading-8">{children}</ul>;
}
function P({ children }: PropsWithChildren) {
  return <p className="mt-8 text-base leading-6 md:leading-8">{children}</p>;
}

export function useMDXComponents(components: { textContent: string }) {
  return { h1: H1, h2: H2, h3: H3, h4: H4, ul: LIST, p: P, ...components };
}
