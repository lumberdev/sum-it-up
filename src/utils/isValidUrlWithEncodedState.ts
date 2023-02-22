import { getStringOrFirst } from "~/typescript-helpers/type-cast-functions";

export function isValidJSON(jsonStr: string): boolean {
  try {
    JSON.parse(jsonStr);
    return true;
  } catch (e) {
    return false;
  }
}

export function isValidUrlWithEncodedState(searchParams?: { [key: string]: string | string[] | undefined }): boolean {
  return getStringOrFirst(searchParams?.original).length > 0 && isValidJSON(getStringOrFirst(searchParams?.result))
    ? true
    : false;
}
