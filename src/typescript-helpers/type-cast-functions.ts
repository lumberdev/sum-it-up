/**
 * Useful for casting query parameters to strings.
 * Gets string or first string value in array, if none,
 * returns empty string
 */
export function getStringOrFirst(data: String | Array<string> | undefined): string {
  if (typeof data === "string") return data;
  if (Array.isArray(data)) return data[0];
  return "";
}
