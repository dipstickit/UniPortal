import { Pagination, SubjectGroup } from '../types'
import { api } from './api'


interface SubjectGroupsResponse extends Pagination {
  subjectGroups: SubjectGroup[],
}

export interface PageQuery {
  page?: number,
  search?: string,
  all?: boolean
}

export const subjectGroupsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSubjectGroups: build.query<SubjectGroupsResponse, PageQuery>({
      query: ({ all = false, page = 1, search = '' }) => ({ url: `/api/v1/subjects/groups?search=${search}&page=${page}&all=${all}` }),
    }),
  }),
})

export const {
  useGetSubjectGroupsQuery
} = subjectGroupsApi
