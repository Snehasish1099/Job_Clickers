import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    userDetail: {},
    loading: false,
    error: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userDetailsReducer: (state, action) => {
            state.userDetail = action.payload;
            state.loading = false;
            state.error = false;
        },
    }
})

export const { userDetailsReducer } = authSlice.actions;
export default authSlice.reducer;