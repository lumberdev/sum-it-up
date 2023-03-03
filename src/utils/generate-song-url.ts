export const generateSongUrl = (artistName: string, songTitle: string) => {
  return `https://www.google.com/search?q=lyrics+to+${artistName.split(" ").join("-")}+${songTitle
    .split(" ")
    .join("-")}`;
};
