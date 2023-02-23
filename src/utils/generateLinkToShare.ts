import LZString from "lz-string";
import { ResponseType } from "~/types";

export function encodeStateToUrl(originalContent: string, responseObject: ResponseType): string {
  const baseUrl = process.env.BASE_URL || window.location.origin;
  const compressedOriginal = LZString.compressToEncodedURIComponent(originalContent);
  const compressedResult = LZString.compressToEncodedURIComponent(JSON.stringify(responseObject));
  const queryString = `?original=${compressedOriginal}&result=${encodeURIComponent(compressedResult)}`;
  return baseUrl + queryString;
}
