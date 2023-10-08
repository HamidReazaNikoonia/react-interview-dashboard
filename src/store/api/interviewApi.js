import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';

export const interviewApi = createApi({
    reducerPath: 'interviewApi',
    baseQuery: customFetchBase,
    tagTypes: ['Interview'],
    endpoints: (builder) => ({
        createInterview: builder.mutation({
            query(interview) {
                return {
                    url: `/interview/${interview.userId}/record`,
                    method: 'POST',
                    body: interview
                };
            },
            invalidatesTags: [{ type: 'Interview', id: 'LIST' }],
            transformResponse: (result) => result.data.interview
        }),
        updateInterview: builder.mutation({
            query({ id, interview }) {
                return {
                    url: `/posts/${id}`,
                    method: 'PATCH',
                    credentials: 'include',
                    body: interview
                };
            },
            invalidatesTags: (result, error, { id }) =>
                result
                    ? [
                          { type: 'Interview', id },
                          { type: 'Interview', id: 'LIST' }
                      ]
                    : [{ type: 'Interview', id: 'LIST' }],
            transformResponse: (response) => response.data.interview
        }),
        getInterview: builder.query({
            query(id) {
                return {
                    url: `/posts/${id}`,
                    credentials: 'include'
                };
            },
            providesTags: (result, error, id) => [{ type: 'Interview', id }]
        }),
        getAllInterviews: builder.query({
            query() {
                return {
                    url: `/posts`,
                    credentials: 'include'
                };
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Interview',
                              id
                          })),
                          { type: 'Interview', id: 'LIST' }
                      ]
                    : [{ type: 'Interview', id: 'LIST' }],
            transformResponse: (results) => results.data.interview
        }),
        deleteInterview: builder.mutation({
            query(id) {
                return {
                    url: `/posts/${id}`,
                    method: 'Delete',
                    credentials: 'include'
                };
            },
            invalidatesTags: [{ type: 'Interview', id: 'LIST' }]
        })
    })
});

export const { useCreateInterviewMutation, useDeleteInterviewMutation, useUpdateInterviewMutation, useGetAllInterviewQuery } = interviewApi;
