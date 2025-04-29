import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    singleJobData: {},
    loading: false,
    error: false,
};

export const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        allJobReducer: (state, action) => {
            state.jobs = action.payload;
            state.loading = false;
            state.error = false;
        },
        singleJobReducer: (state, action) => {
            state.singleJobData = action.payload;
            state.loading = false;
            state.error = false;
        },
    }
})

export const { allJobReducer, singleJobReducer } = jobSlice.actions;
export default jobSlice.reducer;