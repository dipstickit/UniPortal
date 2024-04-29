import { toast } from '@/components/ui/use-toast'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      toast({
        title: 'Error!',
        // description:
        //   'data' in action.error
        //     ? (action.error.data as { message: string }).message
        //     : action.error.message,
      })
    }
    return next(action)
  }