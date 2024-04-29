import { roles } from "@/app/constants"
import { useAppSelector } from "@/app/hooks"
import { selectUserInfo } from "@/features/auth/authSlice"
import { Outlet, Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const userInfo = useAppSelector(selectUserInfo)
  const location = useLocation();

  return (
    allowedRoles?.includes(userInfo?.role as string)
      ? <Outlet />
      : <Navigate to="/signin" state={{ from: location }} replace />
  )
}

export default ProtectedRoute