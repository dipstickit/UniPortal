import { Institution, Pagination } from '../types'
import { api } from './api'


export interface PageQuery {
  page?: number,
  search?: string,
  sort?: 'ASC' | 'DESC',
  all?: boolean,
  provinceId?: string
}
interface InstitutionResponse extends Pagination {
  institutions: Institution[],
}


export const institutionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutions: builder.query<InstitutionResponse, PageQuery>({
      query: ({ page = 1, search = '', sort = 'ASC', all= false }) => ({
        url: `/api/v1/institutions?search=${search}&sort=${sort}&page=${page}&all=${all}`
      }),
      providesTags: ['Institution']
    }),
    getInstitution: builder.query<Institution, string>({
      query: (id) => ({
        url: `/api/v1/institutions/${id}`
      }),
    }),
    createInstitution: builder.mutation({
      query: (data) => ({
        url: `/api/v1/institutions`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Institution'],
    }),
    updateInstitution: builder.mutation({
      query: ({id, body}) => ({
        url: `/api/v1/institutions/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Institution'],
    }),
    deleteInstitution: builder.mutation({
      query: (id) => ({
        url: `/api/v1/institutions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Institution'],
    }),
  }),
})

export const {
  useGetInstitutionsQuery, useCreateInstitutionMutation, useDeleteInstitutionMutation, useUpdateInstitutionMutation, useGetInstitutionQuery
} = institutionApi
