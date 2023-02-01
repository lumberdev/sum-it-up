import { RequestBody } from "~/types";

export const fetchSummaryData = async (data: RequestBody) => {
  const res = await fetch(`/api/fetchSummary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};
