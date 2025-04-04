import {UserDetails} from "src/services/types";


export const getSavedUserDetails = (): UserDetails | null => {
    const data = localStorage.getItem("cachedUserDetails");
    return data ? JSON.parse(data) as UserDetails : null; // Convert back to object
};

export const saveUserDetails = (userDetails: UserDetails) => {
    localStorage.setItem("cachedUserDetails", JSON.stringify(userDetails)); // Store as a string
};

export const clearSavedUserDetails = () => {
    localStorage.removeItem("cachedUserDetails");
};
