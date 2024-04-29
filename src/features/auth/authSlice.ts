// features/auth/authSlice.js
import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit'
type AuthType = {
  userInfo: null | {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    role?: 'ADMIN' | 'STAFF' | 'STUDENT',
    status?: 'ACTIVE' | 'INACTIVE' | 'UNVALIDATED',
    avatarLink: null | string
  },
  userToken: null | string,
}

const initialState: AuthType = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
  userToken: localStorage.getItem('userToken') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.userToken = action.payload?.userToken
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
      localStorage.setItem('userToken', action.payload?.userToken)
    },
    logout: (state) => {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken') // deletes token from storage
      state.userInfo = null
      state.userToken = null
    },
  },
})



export const { logout, setCredentials } = authSlice.actions
export const selectUserInfo = (state: RootState) => state.auth.userInfo
export const selectUserToken = (state: RootState) => state.auth.userToken

export default authSlice.reducer