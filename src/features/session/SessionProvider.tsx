import {ReactNode, useEffect, useState} from "react";
import React from "react";
import {SessionContext} from "./SessionContext";
import LoadingView from "../../views/common/LoadingView";
import NoSessionView from "../../views/common/NoSessionView";
import {authenticationCheck, getLoginUrl} from "../../services/authenticationService";

export const SessionProvider = ({children}: { children: ReactNode }) => {
    // Omit session management for non-prod env
    if (import.meta.env.VITE_ENV_MODE === "dev") {
        return (
            <SessionContext.Provider value={{ isActive: true }}>
                {children}
            </SessionContext.Provider>
        );
    }

    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Function to verify session
    const verifySession = async () => {
        try {
            setIsLoading(true);
            const response = await authenticationCheck();
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
        window.location.href = getLoginUrl();
        return <NoSessionView/>;
    }

    console.log("Returning session context provider");
    return (
        <SessionContext.Provider value={{isActive}}>
            {children}
        </SessionContext.Provider>
    );
};