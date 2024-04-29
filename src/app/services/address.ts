import { Pagination } from '../types'
import { api } from './api'

export interface PageQuery {
  page?: number,
  sort?: 'ASC' | 'DESC'
  search?: string,
  all?: boolean
}

interface WardsResponse extends Pagination {
  wards: {
    id: number,
    name: string
  }[]
}

interface CityProvincesResponse extends Pagination {
  cityProvinces: {
    id: number,
    name: string
  }[]
}



export const AddressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCityProvinces: builder.query<CityProvincesResponse, PageQuery>({
      query: ({ page = 1, sort = '', search = '', all = false }) => ({ url: `/api/v1/addresses/wards/districts/city-provinces?search=${search}&sort=${sort}&page=${page}&all=${all}` }),
    }),
    getWards: builder.query<WardsResponse, PageQuery>({
      query: ({ page = 1, sort = '', search = '', all = false }) => ({ url: `/api/v1/addresses/wards?search=${search}&sort=${sort}&page=${page}&all=${all}` }),
    }),
  }),
})

export const {
  useGetCityProvincesQuery, useGetWardsQuery
} = AddressApi
