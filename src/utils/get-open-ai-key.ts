import { openAiStorageKey } from "~/constants";
import { checkOpenAiKeyStatus } from "./check-open-ai-key-status";

/*
  Call to fetch encrypted key and decrypt it
  */
async function decryptMessage() {
  const res = await fetch("/api/get-encrypted");

  async function importKey(keyData: string) {
    // @ts-ignore it does support jwk
    let key = await window.crypto.subtle.importKey("jwk", keyData, { name: "AES-GCM" }, true, ["decrypt", "encrypt"]);
    return key;
  }

  try {
    const body = (await res.json()) as { iv: string; ciphertext: string; exportedKey: string };

    const { iv, ciphertext, exportedKey } = body;

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
  } catch (e) {
    return "";
  }
}

export const getOpenAiKey = async () => {
  const key = await decryptMessage();
  const localKey = localStorage.getItem(openAiStorageKey);
  if (await checkOpenAiKeyStatus(key as string)) return key;
  if (await checkOpenAiKeyStatus(localKey as string)) return localKey;

  return null;
};
