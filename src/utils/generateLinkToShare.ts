import { ResponseType } from "~/types";

export function encodeStateToUrl(originalContent: string, responseObject: ResponseType): string {
  const baseUrl = (process.env.BASE_URL || window.location.origin) + "/result";
  const queryString = `?original=${encodeURIComponent(originalContent)}&result=${encodeURIComponent(
    JSON.stringify(responseObject),
  )}`;
  return baseUrl + queryString;
}
