import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import demoSlice from './demoReducer' // <--- Not for use, this is just an example
import authReducer from '@/src/containers/authetication/authReducer'
import jobReducer from "@/src/containers/jobs/jobReducer"
import applicationReducer from '@/src/containers/applications/applicationReducer'
import profileUpdate from '@/src/redux/profileUpdateFormReducer'

const combinedReducer = combineReducers({
  abc: demoSlice, // <--- Not for use, this is just an example
  auth: authReducer,
  jobs: jobReducer,
  application: applicationReducer,

  profileUpdate: profileUpdate
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'RESET') {
        state = {};
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;