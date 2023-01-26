export const fetchArticleData = async (url: string) => {
  const res = await fetch(`/api/readability?url_resource="${url}"`);
  return await res.json();
};
