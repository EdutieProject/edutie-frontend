import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {navSections} from "./navigationPath";

// ===== SAVED NAV STATE ======

export interface SelectedNavigationSelectionContextType {
    selectedSectionId: String;
    setSelectedSectionId: Dispatch<SetStateAction<string>>;
}

export const SelectedNavigationSectionContext = createContext<SelectedNavigationSelectionContextType>({
    setSelectedSectionId: () => {
    }, selectedSectionId: ""
});


interface SelectedNavigationSectionProviderProps {
    children: React.ReactNode;
}

/**
 * This component is responsible for navbar state's management as well as for it overridability.
 * The structure looks like this: SelectedNavigationSectionProvider -> Router -> Navlayout -> Navbar
 * NavBar uses this context as a manager of its state that is agnostic from the routing re-rendering.
 * @returns JSX element
 */
export const SelectedNavigationSectionProvider = ({children}: SelectedNavigationSectionProviderProps) => {
    const [selectedSectionId, setSelectedSectionId] = useState("");

    return (
        <SelectedNavigationSectionContext.Provider
            value={{selectedSectionId: selectedSectionId, setSelectedSectionId: setSelectedSectionId}}
        >{children}
        </SelectedNavigationSectionContext.Provider>
    );
}
