export function isValidJSON(jsonStr: string): boolean {
  try {
    JSON.parse(jsonStr);
    return true;
  } catch (e) {
    return false;
  }
}
