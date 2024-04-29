import { AdmissionDetails, AdmissionMajors, AdmissionPlans, AdmissionTrainingPrograms, Institution, Methods, Pagination } from '../types'
import { api } from './api'

export interface PageQuery {
  page?: number,
  search?: string,
  id?: string,
  all?: boolean,
  institutionId?: string,
  admissionId?: string
}
interface AdmissionResponse extends Pagination {
  admissionPlans?: AdmissionPlans[],
}

interface TrainingProgramsResponse extends Pagination {
  trainingPrograms: {
    name: string,
    id: number,
  }[],
}

interface MethodsResponse extends Pagination {
  admissionMethods: Methods[]
}

interface AdmissionMajorsResponse extends Pagination {
  admissionMajors: AdmissionMajors[]
}

interface TrainingProgramsResponse extends Pagination {
  admissionTrainingPrograms: {
    name: string,
    id: number,
    trainingProgram: {
      name: string,
      id: number
    }
  }[],
}




export const admissionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdmissions: builder.query<AdmissionResponse, PageQuery>({
      query: ({ page = 1, search = '', institutionId = '' }) => ({
        url: `/api/v1/admission-plans?search=${search}&page=${page}&institutionId=${institutionId}`
      }),
      providesTags: ['Admission']
    }),

    createAdmission: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/admission-plans`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Admission'],
    }),

    updateAdmission: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/admission-plans/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Admission'],
    }),

    deleteAdmission: builder.mutation({
      query: (id) => ({
        url: `/api/v1/admission-plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admission'],
    }),

    getAdmissionDetails: builder.query<AdmissionDetails, string>({
      query: (id) => ({
        url: `/api/v1/admission-plans/${id}`
      }),
      providesTags: ['Admission']
    }),

    getTrainingPrograms: builder.query<TrainingProgramsResponse, PageQuery>({
      query: ({ page = 1, search = '' }) => ({
        url: `/api/v1/admission-plans/training-programs?search=${search}&page=${page}`
      }),
      providesTags: ['Admission']
    }),


    getAdmissionTrainingPrograms: builder.query<TrainingProgramsResponse, PageQuery>({
      query: ({ id, page = 1, search = '' }) => ({
        url: `/api/v1/admission-plans/${id}/training-programs?search=${search}&page=${page}`
      }),
      providesTags: ['Admission']
    }),

    createAdmissionTrainingProgram: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/admission-plans/${id}/training-programs`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Admission'],
    }),

    deleteAdmissionTrainingProgram: builder.mutation({
      query: (id) => ({
        url: `/api/v1/admission-plans/training-programs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admission'],
    }),

    updateAdmissionTrainingProgram: builder.mutation({
      query: ({ admissionId, trainingProgramId, body }) => ({
        url: `/api/v1/admission-plans/${admissionId}/training-programs/${trainingProgramId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Admission'],
    }),

    createAdmissionMajor: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/admission-plans/${id}/majors`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Admission'],
    }),

    deleteAdmissionMajor: builder.mutation({
      query: (admissionMajorId) => ({
        url: `/api/v1/admission-plans/majors/${admissionMajorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admission'],
    }),

    updateAdmissionMajor: builder.mutation({
      query: ({ admissionId, admissionMajorId, body }) => ({
        url: `/api/v1/admission-plans/${admissionId}/majors/${admissionMajorId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Admission'],
    }),

    getAdmissionMethods: builder.query<MethodsResponse, PageQuery>({
      query: ({ page = 1, all = false }) => ({
        url: `/api/v1/admission-plans/methods?page=${page}&all=${all}`
      }),
      // providesTags: ['Admission']
    }),

    createAdmissionMethods: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/admission-plans/majors/${id}/methods`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Admission'],
    }),

    deleteAdmissionMajorMethod: builder.mutation({
      query: (admissionMajorMethodId) => ({
        url: `/api/v1/admission-plans/majors/methods/${admissionMajorMethodId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admission'],
    }),

    updateAdmissionMajorMethod: builder.mutation({
      query: ({ admissionMajorId, admissionMajorMethodId, body }) => ({
        url: `/api/v1/admission-plans/majors/${admissionMajorId}/methods/${admissionMajorMethodId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Admission'],
    }),

    getAdmissionMajors: builder.query<AdmissionMajorsResponse, PageQuery>({
      query: ({ id, search, page }) => ({
        url: `/api/v1/admission-plans/${id}/majors?search=${search}&page=${page}`
      }),
      providesTags: ['Admission']
    }),
  }),
})

export const {
  useGetAdmissionsQuery,
  useCreateAdmissionMutation,
  useUpdateAdmissionMutation,
  useDeleteAdmissionMutation,
  useGetAdmissionDetailsQuery,
  useGetTrainingProgramsQuery,
  useGetAdmissionTrainingProgramsQuery,
  useCreateAdmissionTrainingProgramMutation,
  useDeleteAdmissionTrainingProgramMutation,
  useUpdateAdmissionTrainingProgramMutation,
  useCreateAdmissionMajorMutation,
  useDeleteAdmissionMajorMutation,
  useUpdateAdmissionMajorMutation,
  useGetAdmissionMethodsQuery,
  useCreateAdmissionMethodsMutation,
  useDeleteAdmissionMajorMethodMutation,
  useUpdateAdmissionMajorMethodMutation,
  useGetAdmissionMajorsQuery
} = admissionApi
