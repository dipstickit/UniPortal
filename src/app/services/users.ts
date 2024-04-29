import { Account, Pagination } from '../types'
import { api } from './api'


interface AccountsResponse extends Pagination {
  accounts: Account[],
}


interface AccountsQuery {
  search?: string,
  role?: 'ADMIN' | 'STAFF' | 'STUDENT',
  status?: 'ACTIVE' | 'INACTIVE' | 'UNVALIDATED',
  sort?: 'ASC' | 'DESC',
  page?: number
}

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/login`,
        method: 'POST',
        body: data
      })
    }),
    loginGoogle: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/login/google`,
        method: 'POST',
        body: data
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/api/v1/accounts`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateAccount: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/accounts/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),
    getAccounts: builder.query<AccountsResponse, AccountsQuery>({
      query: ({ search, role, status, sort, page }) => ({
        url: `/api/v1/accounts?search=${search}&role=${role || ''}&status=${status || ''}&sort=${sort}&page=${page}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getAccount: builder.query<Account, string>({
      query: (id) => ({
        url: `/api/v1/accounts/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getCurrentUser: builder.query<Account, void>({
      query: () => ({
        url: `/api/v1/accounts/current`
      }),
      providesTags: ['User'],
    }),
    updateCurrentUser: builder.mutation({
      query: ({body}) => ({
        url: `/api/v1/accounts/current`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),
  })
})

export const { useLoginMutation, useLoginGoogleMutation, useRegisterMutation, useGetAccountsQuery, useGetCurrentUserQuery, useUpdateAccountMutation, useGetAccountQuery, useUpdateCurrentUserMutation } = usersApi