import { Department, Major, Pagination } from '../types'
import { api } from './api'

export interface PageQuery {
  page?: number,
  sort?: 'ASC' | 'DESC'
  search?: string,
  all?: boolean
}

interface MajorsResponse extends Pagination {
  majors: Major[],
  totalPage: number
}

interface DepartmentsResponse extends Pagination {
  departments: Department[],
  totalPage: number
}

interface SchoolsResponse extends Pagination {
  schools: Department[],
  totalPage: number
}



export const majorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMajors: builder.query<MajorsResponse, PageQuery>({
      query: ({ page = 1, sort = '', search = '', all = false }) => ({ url: `/api/v1/majors?search=${search || ''}&sort=${sort}&page=${page}&all=${all}` }),
      providesTags: ['Major']
    }),
    getMajor: builder.query<Major, string>({
      query: (id) => ({ url: `/api/v1/majors/${id}` }),
      providesTags: ['Major']
    }),
    createMajor: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/majors`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Major'],
    }),
    deleteMajor: builder.mutation({
      query: (id) => ({
        url: `/api/v1/majors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Major'],
    }),

    updateMajor: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/majors/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Major'],
    }),

    getDepartments: builder.query<DepartmentsResponse, PageQuery>({
      query: ({ page = 1, sort = '', search = '', all = false }) => ({ url: `/api/v1/majors/departments?search=${search}&sort=${sort}&page=${page}&all=${all}` }),
      providesTags: ['Major']
    }),

    getDepartment: builder.query<Department, string>({
      query: (id) => ({ url: `/api/v1/majors/departments/${id}` }),
      providesTags: ['Major']
    }),

    createDepartment: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/majors/departments`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Major'],
    }),

    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/api/v1/majors/departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Major'],
    }),

    updateDepartment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/majors/departments/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Major'],
    }),

    getSchools: builder.query<SchoolsResponse, PageQuery>({
      query: ({ page = 1, sort = '', search = '', all = false }) => ({ url: `/api/v1/majors/departments/schools?search=${search}&sort=${sort}&page=${page}` }),
      providesTags: ['Major']
    }),

    getSchool: builder.query<Department, string>({
      query: (id) => ({ url: `/api/v1/majors/departments/schools/${id}` }),
      providesTags: ['Major']
    }),

    createSchool: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/majors/departments/schools`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Major'],
    }),
    deleteSchool: builder.mutation({
      query: (id) => ({
        url: `/api/v1/majors/departments/schools/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Major'],
    }),

    updateSchool: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/majors/departments/schools/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Major'],
    }),
  }),
})

export const {
  useGetMajorsQuery,
  useGetMajorQuery,
  useCreateMajorMutation,
  useUpdateMajorMutation,
  useDeleteMajorMutation,
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useGetDepartmentQuery,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetSchoolsQuery,
  useDeleteSchoolMutation,
  useCreateSchoolMutation,
  useGetSchoolQuery,
  useUpdateSchoolMutation,

} = majorsApi
