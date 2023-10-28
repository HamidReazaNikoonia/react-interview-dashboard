import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';

export const interviewApi = createApi({
    reducerPath: 'interviewApi',
    baseQuery: customFetchBase,
    refetchOnFocus: true,
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
            invalidatesTags: [{ type: 'Interview', id: 'LIST' }]
            // transformResponse: (result) => result.data
        }),
        updateInterview: builder.mutation({
            query({ id, userId, body }) {
                return {
                    url: `/interview/${userId}/record/${id}`,
                    method: 'PUT',
                    body: body
                };
            }
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
            query({ id }) {
                return {
                    url: `/interview/${id}/record`
                };
            },
            // providesTags: (result) =>
            //     result
            //         ? [
            //               ...result.map(({ id }) => ({
            //                   type: 'Interview',
            //                   id
            //               })),
            //               { type: 'Interview', id: 'LIST' }
            //           ]
            //         : [{ type: 'Interview', id: 'LIST' }],
            transformResponse: (results) => results.records
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
        }),
        // coach
        getCoachByCode: builder.query({
            query(coachCode) {
                return {
                    url: `/coach/${coachCode}`
                };
            }
        })
    })
});

export const {
    useCreateInterviewMutation,
    useDeleteInterviewMutation,
    useUpdateInterviewMutation,
    useLazyGetAllInterviewsQuery,
    useLazyGetCoachByCodeQuery
} = interviewApi;
