import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logout } from '../features/userSlice';

const baseUrl = `${process.env.REACT_APP_SERVER_ENDPOINT}/`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        // const token = getState().userState.user.token.accessToken;
        const token = localStorage.getItem('user-token') || '';
        console.log(getState().userState);
        console.log('hoooo');

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    }
});

const customFetchBase = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.data?.message === 'You are not logged in') {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQuery({ credentials: 'include', url: 'auth/refresh' }, api, extraOptions);

                if (refreshResult.data) {
                    // Retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                    window.location.href = '/login';
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export default customFetchBase;
