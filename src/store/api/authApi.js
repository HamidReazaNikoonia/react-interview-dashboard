import { createApi } from '@reduxjs/toolkit/query/react';

import customFetchBase from './customFetchBase';
import { userApi } from './userApi';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query(data) {
                return {
                    url: 'auth/register',
                    method: 'POST',
                    body: data
                };
            }
        }),
        loginUser: builder.mutation({
            query(data) {
                return {
                    url: 'auth/login',
                    method: 'POST',
                    body: data,
                    credentials: 'include'
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {}
            }
        }),
        logoutUser: builder.mutation({
            query() {
                return {
                    url: 'auth/logout',
                    credentials: 'include'
                };
            }
        }),
        verifyEmail: builder.mutation({
            query(verificationCode) {
                return {
                    url: `auth/verifyemail/${verificationCode}`,
                    credentials: 'include'
                };
            }
        }),
        forgotPassword: builder.mutation({
            query(body) {
                return {
                    url: `auth/forgotpassword`,
                    method: 'POST',
                    credentials: 'include',
                    body
                };
            }
        }),
        resetPassword: builder.mutation({
            query({ resetToken, password, passwordConfirm }) {
                return {
                    url: `auth/resetpassword/${resetToken}`,
                    method: 'PATCH',
                    body: { password, passwordConfirm },
                    credentials: 'include'
                };
            }
        })
    })
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation,
    useVerifyEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = authApi;
