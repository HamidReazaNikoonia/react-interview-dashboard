import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { authApi } from './api/authApi';
import { interviewApi } from './api/interviewApi';
import { userApi } from './api/userApi';
import userReducer from './features/userSlice';
import interviewReducer from './features/interviewSlice';
import uiReducer from './features/ui';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        // Connect the PostApi reducer to the store
        [interviewApi.reducerPath]: interviewApi.reducer,
        userState: userReducer,
        interviewState: interviewReducer,
        ui: uiReducer
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            authApi.middleware,
            userApi.middleware,
            // Add the PostApi middleware to the store
            interviewApi.middleware
        ])
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);
const persister = 'interview.ir';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export { store, persister };
