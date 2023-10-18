import { createApi } from '@reduxjs/toolkit/query/react';
import { setUser } from '../features/userSlice';
import customFetchBase from './customFetchBase';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
    refetchOnFocus: true,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getMe: builder.query({
            query() {
                return {
                    url: 'users/profile'
                };
            },
            keepUnusedDataFor: 0,
            // transformResponse: (result) => result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {}
            }
        })
    })
});

export const { useGetMeQuery } = userApi;
