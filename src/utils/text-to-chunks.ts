export function textToChunks(
  longString: string,
  wordsPerChunk: number
): Array<string> {
  const chunkedText = [];
  const longStringArray = longString.split(/\s+/);
  let wordBuilder = [];
  let currentChunkCount = 0;
  for (let word of longStringArray) {
    currentChunkCount++;
    wordBuilder.push(word);
    if (currentChunkCount >= wordsPerChunk) {
      currentChunkCount = 0;
      chunkedText.push(wordBuilder.join(" "));
      wordBuilder = [];
    }
  }
  if (wordBuilder.length) chunkedText.push(wordBuilder.join(" "));
  return chunkedText;
}
