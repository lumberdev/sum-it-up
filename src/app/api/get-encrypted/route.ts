import { NextResponse } from "next/server";

import crypto from "node:crypto";

export async function GET() {
  /*
    Fetch the contents of the "message" textbox, and encode it
    in a form we can use for the encrypt operation.
    */
  function getMessageEncoding() {
    let message = process.env.OPENAI_API_KEY;
    let enc = new TextEncoder();
    return enc.encode(message);
  }
  /*
    Get the encoded message, encrypt it and display a representation
    of the ciphertext in the "Ciphertext" element.
    */
  async function encryptMessage(key: CryptoKey) {
    let encoded = getMessageEncoding();
    // The iv must never be reused with a given key.
    let iv = crypto.getRandomValues(new Uint8Array(12));
    let ciphertext = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encoded,
    );

    return { secret: new Uint8Array(ciphertext, 0, 5), iv, ciphertext };
  }

  const encryptionKey = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );

  const response = await encryptMessage(encryptionKey);
  const exportedKey = await crypto.subtle.exportKey("jwk", encryptionKey);

  return NextResponse.json({
    exportedKey,
    iv: Buffer.from(response.iv).toJSON(),
    ciphertext: Buffer.from(response.ciphertext).toJSON(),
    secret: response.secret,
  });
}
