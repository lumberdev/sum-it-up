import { openAiStorageKey } from "~/constants";

/*
  Call to fetch encrypted key and decrypt it
  */
async function decryptMessage() {
  const res = await fetch("/api/get-encrypted");
  const body = (await res.json()) as { iv: string; ciphertext: string; exportedKey: string };

  const { iv, ciphertext, exportedKey } = body;

  async function importKey(keyData: string) {
    // @ts-ignore it does support jwk
    let key = await window.crypto.subtle.importKey("jwk", keyData, { name: "AES-GCM" }, true, ["decrypt", "encrypt"]);
    return key;
  }

  const key = await importKey(exportedKey); // Import key to crypto so it's usable
  let decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: Buffer.from(iv),
    },
    key,
    Buffer.from(ciphertext),
  );

  let dec = new TextDecoder();
  return dec.decode(decrypted);
}

export const getOpenAiKey = async () => {
  const key = await decryptMessage();
  const apiKey = localStorage.getItem(openAiStorageKey) || key;
  if (!apiKey) throw new Error("Missing key");
  return apiKey;
};
