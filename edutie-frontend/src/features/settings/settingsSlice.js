import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeColor:{ 
        primary:'',
        secondary:''
    } 
}



export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        setColors: (state, action) => {
            state.activeColor.primary = action.payload.backgroundPrimary,           
            state.activeColor.secondary = action.payload.backgroundSecondary           
        },

    }
})

export const { setColors } = settingsSlice.actions;

export default settingsSlice.reducer