/**
 * @description This slice is example of a component reducer function that will be created 
 * for each component in container.
 */

import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    users: [],
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state: any, action: any) => {
            state.users = action.payload;
            state.loading = true;
            state.error = false;
        },
        createUser: (state: any, action: any) => {
            state.users.unshift(action.payload);
            state.loading = false;
        },
        deleteUser: (state: any, action: any) => {
            state.users.filter((user: any) => user?.id !== action?.payload?.id);
            state.loading = false;
        },
    },
});

export const { createUser, deleteUser, getUser } = userSlice.actions;
export default userSlice.reducer;