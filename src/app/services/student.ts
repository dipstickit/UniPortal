import { Student, StudentRecord } from '../types'
import { api } from './api'

export const studentApi = api.injectEndpoints({
    endpoints: (builder) => ({
      getCurrentStudent: builder.query<Student, void>({
        query: () => ({
          url: `/api/v1/students/current`,
          method: 'GET'
        }),
        providesTags: ['Student']
      }),
      updateCurrentStudent: builder.mutation({
        query: ({body}) => ({
          url: `/api/v1/students/current`,
          method: 'PUT',
          body: body
        }),
        invalidatesTags: ['Student']
      }),
      getCurrentStudentRecord: builder.query<StudentRecord, void>({
        query: () => ({
          url: `/api/v1/students/current/records`,
          method: 'GET'
        })
      }),
      updateCurrentStudentRecord: builder.mutation({
        query: ({body}) => ({
          url: `/api/v1/students/current/records`,
          method: 'PUT',
          body: body
        }),
      }),
  })
})
export const { useGetCurrentStudentQuery, useUpdateCurrentStudentMutation, useGetCurrentStudentRecordQuery, useUpdateCurrentStudentRecordMutation } = studentApi