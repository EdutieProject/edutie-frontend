/** Random fact storage */
export const getRandomFactSaveDate = () => localStorage.getItem("randomFactSaveDate") ? new Date(localStorage.getItem("randomFactSaveDate") as string) : null;
export const getSavedRandomFact = () => localStorage.getItem("randomFact");
export const saveRandomFact = (randomFact: string) => {
    localStorage.setItem("randomFact", randomFact);
    localStorage.setItem("randomFactSaveDate", new Date().toDateString());
}