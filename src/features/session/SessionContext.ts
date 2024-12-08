import {createContext, useContext} from "react";

interface SessionState {
    isActive: boolean
}

export const SessionContext = createContext<SessionState>({ isActive: false });

export const useSession = () => {
    return useContext(SessionContext);
};