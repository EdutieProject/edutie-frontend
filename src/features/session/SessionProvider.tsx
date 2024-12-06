import {ReactNode, useEffect, useState} from "react";
import React from "react";
import {SessionContext} from "./SessionContext";
import LoadingView from "../../views/common/LoadingView";
import NoSessionView from "../../views/common/NoSessionView";

export const SessionProvider = ({children}: { children: ReactNode }) => {
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Function to verify session
    const verifySession = async () => {
        try {
            setIsLoading(true);
            //TODO: change realm name, move function to services
            const response = await fetch(window.location.protocol + "//" +import.meta.env.VITE_BACKEND_HOST + "/api/v1/inspection/test-authentication", {credentials: "include"});
            if (response.ok) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        } catch (error) {
            console.error("Session verification failed:", error);
            setIsActive(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        verifySession(); // Automatically verify session on mount
    }, []);

    if (isLoading) {
        return <LoadingView embedded/>
    }

    if (!isActive) {
        console.log("Returning no-session view");
        return <NoSessionView/>;
    }

    console.log("Returning session context provider");
    return (
        <SessionContext.Provider value={{isActive}}>
            {children}
        </SessionContext.Provider>
    );
};