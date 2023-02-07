// @ts-nocheck
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

const SSE_RESPONSE_HEADER = {
  Connection: "keep-alive",
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "X-Accel-Buffering": "no",
};

export default async function handler(req: NextRequest, res: NextApiResponse) {
  // Writes response header.

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  countdown(res, 10);

  function countdown(res, count) {
    res.write("data: " + count + "\n\n");
    if (count) setTimeout(() => countdown(res, count - 1), 1000);
    else res.end();
  }
}

export const config = {
  type: "experimental-background",
};
