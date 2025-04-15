import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import demoSlice from './demoReducer' // <--- Not for use, this is just an example
import authReducer from '@/src/containers/authetication/authReducer'

const combinedReducer = combineReducers({
  abc: demoSlice, // <--- Not for use, this is just an example
  auth: authReducer
});

const rootReducer = (state: any, action: AnyAction) => {
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