import ClientPage from "./clientPage";
import { render, screen } from "~/test-utils/provider";
import {
  __mock__query__param__article,
  __mock_query_param_song,
  __mock_query_param_text,
} from "~/test-utils/mocks/queryParamMocks";

test("loads new search page", () => {
  render(<ClientPage searchParams={{ result: "", songDetails: "", original: "" }} />);
  expect(
    screen.getByText("Get an instant summary of any text, article content (URL) or song for free."),
  ).toBeInTheDocument();
});

test("loads page with result for article content", () => {
  render(<ClientPage searchParams={__mock__query__param__article} />);
  expect(screen.getByTestId("result-heading-title")).toHaveTextContent("Article Summary");
  expect(screen.getByText("Sum up a new one")).toBeInTheDocument();
  expect(screen.getByText("hello")).toBeInTheDocument();
});

test("loads page with result for text content", () => {
  render(<ClientPage searchParams={__mock_query_param_text} />);
  expect(screen.getByTestId("result-heading-title")).toHaveTextContent("Summary");
  expect(screen.getByText("Sum up a new one")).toBeInTheDocument();
  expect(screen.getByText("hello")).toBeInTheDocument();
});

test("loads page with result for song content", () => {
  render(<ClientPage searchParams={__mock_query_param_song} />);
  expect(screen.getByTestId("result-heading-title")).toHaveTextContent("Song Meaning");
  expect(screen.getByText("Sum up a new one")).toBeInTheDocument();
  expect(screen.getByText("hello")).toBeInTheDocument();
});
