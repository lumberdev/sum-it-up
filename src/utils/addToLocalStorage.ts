export function addToLocalStorage(newData: ResponseType) {
  const existingData = localStorage.getItem("summaries");
  if (existingData) {
    const existingDataArr: ResponseType[] = JSON.parse(existingData);
    existingDataArr.push(newData);
    localStorage.setItem("summaries", JSON.stringify(existingDataArr));
  } else {
    localStorage.setItem("summaries", JSON.stringify([newData]));
  }
}
