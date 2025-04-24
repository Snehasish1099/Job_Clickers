import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
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
        }
    }
})

export const { allJobReducer } = jobSlice.actions;
export default jobSlice.reducer;