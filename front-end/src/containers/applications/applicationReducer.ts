import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    applications: [],
    applicationsByJobId: [],
    loading: false,
    error: false,
};

const authSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        userApplicationReducer: (state, action) => {
            state.applications = action.payload;
            state.loading = false;
            state.error = false;
        },
        employerGetApplicationsByJob: (state, action) => {
            state.applicationsByJobId = action.payload;
            state.loading = false;
            state.error = false;
        }
    }
})

export const { userApplicationReducer, employerGetApplicationsByJob } = authSlice.actions;
export default authSlice.reducer;