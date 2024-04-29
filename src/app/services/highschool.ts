import { Highschool, Pagination } from '../types'
import { api } from './api'

export interface PageQuery {
  page?: number,
  sort?: 'ASC' | 'DESC'
  search?: string,
  all?: boolean
}

interface HighschoolsResponse extends Pagination {
  highSchools: Highschool[]
}




export const HighschoolsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHighschools: builder.query<HighschoolsResponse, PageQuery>({
      query: ({ page = 1, sort = '', search = '', all = false }) => ({ url: `/api/v1/high-schools?search=${search}&sort=${sort}&page=${page}&all=${all}` }),
      providesTags: ['Highschool']
    }),
    getHighschool: builder.query<Highschool, string>({
      query: (id) => ({ url: `/api/v1/high-schools/${id}` }),
      providesTags: ['Highschool']
    }),
    createHighschool: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/high-schools`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Highschool'],
    }),
    deleteHighschool: builder.mutation({
      query: (id) => ({
        url: `/api/v1/high-schools/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Highschool'],
    }),

    updateHighschool: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/high-schools/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Highschool'],
    }),
  }),
})

export const {
  useGetHighschoolsQuery,
  useGetHighschoolQuery,
  useCreateHighschoolMutation,
  useUpdateHighschoolMutation,
  useDeleteHighschoolMutation
} = HighschoolsApi
