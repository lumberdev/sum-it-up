import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();
const renderWithAllTheProviders = (ui: ReactNode) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

export * from "@testing-library/react";

export { renderWithAllTheProviders as render };
