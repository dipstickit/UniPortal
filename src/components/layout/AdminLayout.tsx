import { Link, Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { cn } from "@/lib/shadcn";
import { Backpack, BarChartBigIcon, BookCopyIcon, BookTextIcon, CircleUserIcon, GraduationCap, GraduationCapIcon, LibraryBigIcon, SchoolIcon, SheetIcon } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { selectUserInfo } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { roles } from "@/app/constants";
const AdminLayout = () => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  const userInfo = useAppSelector(selectUserInfo)

  const items = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: BarChartBigIcon,
      label: "Dashboard",
    },
    {
      title: "Admission Plans",
      href: "/admin/admissions",
      icon: SheetIcon,
      label: "Admission",
    },
    {
      title: "Institutions",
      href: "/admin/institutions",
      icon: SchoolIcon,
      label: "User",
    },
    {
      title: "High Schools",
      href: "/admin/high-schools",
      icon: Backpack,
      label: "Highschool",
    },
    {
      title: "Majors",
      href: "/admin/majors",
      icon: BookTextIcon,
      label: "Major",
    },
    {
      title: "Departments",
      href: "/admin/departments",
      icon: BookCopyIcon,
      label: "Department",
    },
    {
      title: "Schools",
      href: "/admin/schools",
      icon: LibraryBigIcon,
      label: "School",
    },
    {
      title: "Accounts",
      href: "/admin/users",
      icon: CircleUserIcon,
      label: "User",
    },
  ];
  const navigate = useNavigate()
  useEffect(() => {
    if (userInfo?.role !== roles.ADMIN) {
      navigate('/')
    }
  }, []);
  return (
    <main>
      <AdminHeader />
      <div>
        <section className="flex justify-center px-2">
          <nav
            className={`relative left-0 pt-12 hidden min-h-[calc(100vh-60px)] border-r-2 lg:block w-72`}
          >
            <div className="space-y-4">
              <div className="px-3 py-2">
                <div className="space-y-1">
                  <nav className="grid items-start gap-4">
                    {items.map((item, index) =>
                      <Link
                        key={index}
                        to={item.href}
                      >
                        <span
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-base font-medium hover:bg-slate-100 hover:text-slate-700",
                            item.href !== '/admin' && pathname.includes(item.href) ? "bg-slate-100" : "transparent",
                            pathname == '/admin' && item.href == '/admin' ? "bg-slate-100" : "transparent",
                          )}
                        >
                          <item.icon className="mr-2 h-6 w-6" />
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </nav>
          <div className="w-full px-8">
            <Outlet />
          </div>
        </section>
      </div>
    </main >
  )
}

export default AdminLayout