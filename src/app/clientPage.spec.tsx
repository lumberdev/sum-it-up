import ClientPage from "./clientPage";
import { render, screen, waitFor } from "~/test-utils/provider";
import {
  __mock__query__param__article,
  __mock_query_param_song,
  __mock_query_param_text,
} from "~/test-utils/mocks/queryParamMocks";

jest.mock("~/utils/get-open-ai-key");

test("loads new search page", async () => {
  render(<ClientPage searchParams={{ result: "", songDetails: "", original: "" }} />);
  await waitFor(() => {
    expect(
      screen.getByText("Get an instant summary of any text, article content (URL) or song for free."),
    ).toBeInTheDocument();
  });
});

test("loads page with result for article content", async () => {
  render(<ClientPage searchParams={__mock__query__param__article} />);
  await waitFor(() => {
    expect(screen.getByTestId("result-heading-title")).toHaveTextContent("Article Summary");
    expect(screen.getByText("Sum up a new one")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});

test("loads page with result for text content", async () => {
  render(<ClientPage searchParams={__mock_query_param_text} />);
  await waitFor(() => {
    expect(screen.getByTestId("result-heading-title")).toHaveTextContent("Summary");
    expect(screen.getByText("Sum up a new one")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});

test("loads page with result for song content", async () => {
  render(<ClientPage searchParams={__mock_query_param_song} />);
  await waitFor(() => {
    expect(screen.getByTestId("result-heading-title")).toHaveTextContent("Song Meaning");
    expect(screen.getByText("Sum up a new one")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
