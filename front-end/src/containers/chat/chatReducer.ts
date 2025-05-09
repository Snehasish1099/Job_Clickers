import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    chatLists: [],
    chatDetails: {},
    openChatWindow: {},
    accData: {},
    loading: false,
    error: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        chatListReducer: (state, action) => {
            state.chatLists = action.payload,
            state.loading = false,
            state.error = false
        },
        chatDetailsReducer: (state, action) => {
            state.chatDetails = action.payload,
            state.loading = false,
            state.error = false
        },
        setOpenChatWindowReducer: (state, action) => {
            state.openChatWindow = action.payload,
            state.loading = false,
            state.error = false
        },
        setAccDataReducer: (state, action) => {
            state.accData = action.payload,
            state.loading = false,
            state.error = false
        }
    }
});

export const { chatListReducer, chatDetailsReducer, setOpenChatWindowReducer, setAccDataReducer } = chatSlice.actions;
export default chatSlice.reducer