import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    post: null
};

export const interviewSlice = createSlice({
    initialState,
    name: 'postSlice',
    reducers: {
        postState: (state, action) => {
            state.post = action.payload;
        }
    }
});

export default interviewSlice.reducer;

export const { interviewState } = interviewSlice.actions;
