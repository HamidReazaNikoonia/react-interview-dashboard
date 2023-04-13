import { createSlice } from '@reduxjs/toolkit';

const config = {
    fontFamily: '',
    borderRadius: 20
};

const initialState = {
    isOpen: [], // for active default menu
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};

export const uiSlice = createSlice({
    initialState,
    name: 'uiSlice',
    reducers: {
        menuOpen: (state, action) => {
            state.isOpen = [action.payload?.id];
        },
        setMenu: (state, action) => {
            state.opened = action.payload.opened;
            // state.opened = !state.opened;
        }
    }
});

export const { menuOpen, setMenu } = uiSlice.actions;

export default uiSlice.reducer;
