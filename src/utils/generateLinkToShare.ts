import { MarkdownResponse, ResponseType } from "~/types";

export function encodeStateToUrl(
  originalContent: string,
  responseObject: MarkdownResponse | ResponseType,
  songDetails?: string,
): string {
  const baseUrl = process.env.BASE_URL || window.location.origin;
  const queryString = `?result=${encodeURIComponent(JSON.stringify(responseObject))}&original=${encodeURIComponent(
    originalContent,
  )}${songDetails ? `&songDetails=${encodeURIComponent(songDetails)}` : ""}`;
  return baseUrl + queryString;
}
