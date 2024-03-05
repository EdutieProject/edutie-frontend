import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeID: 1
}



export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: initialState,
    reducers: {
        setNavElement: (state, action) => {
            state.activeID = action.payload           
        },

    }
})

export const { setNavElement } = navigationSlice.actions;

export default navigationSlice.reducer