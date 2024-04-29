import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './rootReducer'
import authReducer from '@/features/auth/authSlice'
// import { apiSlice } from '../features/api/apiSlice';
import { api } from './services/api'
import { rtkQueryErrorLogger } from './middlewares'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
    // .concat(rtkQueryErrorLogger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
