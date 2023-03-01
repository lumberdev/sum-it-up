import { ResponseType } from "~/types";

export function encodeStateToUrl(originalContent: string, responseObject: ResponseType): string {
  const baseUrl = process.env.BASE_URL || window.location.origin;
  const queryString = `?result=${encodeURIComponent(
    JSON.stringify(responseObject),
  )}&original=${encodeURIComponent(originalContent)}`;
  return baseUrl + queryString;
}
