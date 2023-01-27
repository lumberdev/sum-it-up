export async function getResponseBasedOnContentType(res: Response) {
  let response;
  let contentType = res.headers.get("content-type") ?? "";
  if (contentType.startsWith("application/json;")) response = await res.json();
  else response = await res.text();
  return response;
}
