import { configureStore } from "@reduxjs/toolkit";
import navigationSlice from "./navigation/navigationSlice";
import settingsSlice from "./settings/settingsSlice";

export const store = configureStore({
    reducer: {
        navigation: navigationSlice,
        settings: settingsSlice
    },

});
