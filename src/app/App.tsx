import AdminLayout from "@/components/layout/AdminLayout"
import ProtectedRoute from "@/components/layout/ProtectedRoute"
import SchoolLayout from "@/components/layout/SchoolLayout"
import AdminDashboard from "@/pages/admin"
import AdmissionTable from "@/pages/admin/admissions"
import CreateAdmissionPlan from "@/pages/admin/admissions/create"
import AdmissionDetails from "@/pages/admin/admissions/details"
import AdmissionMajors from "@/pages/admin/admissions/details/majors"
import CreateAdmissionMajor from "@/pages/admin/admissions/details/majors/create"
import UpdateAdmissionMajor from "@/pages/admin/admissions/details/majors/update"
import AdmissionTrainingPrograms from "@/pages/admin/admissions/details/training-programs"
import CreateAdmissionTrainingPrograms from "@/pages/admin/admissions/details/training-programs/create"
import UpdateAdmissionTraningPrograms from "@/pages/admin/admissions/details/training-programs/update"
import UpdateAdmissionPlan from "@/pages/admin/admissions/update"
import DepartmentTable from "@/pages/admin/departments"
import CreateDepartment from "@/pages/admin/departments/create"
import UpdateDepartment from "@/pages/admin/departments/update"
import HighschoolTable from "@/pages/admin/highschools"
import CreateHighSchool from "@/pages/admin/highschools/create"
import UpdateHighSchool from "@/pages/admin/highschools/update"
import InstitutionTable from "@/pages/admin/institutions"
import CreateInstitution from "@/pages/admin/institutions/create"
import UpdateInstitution from "@/pages/admin/institutions/update"
import MajorTable from "@/pages/admin/majors"
import CreateMajor from "@/pages/admin/majors/create"
import UpdateMajor from "@/pages/admin/majors/update"
import SchoolTable from "@/pages/admin/schools"
import CreateSchool from "@/pages/admin/schools/create"
import UpdateSchool from "@/pages/admin/schools/update"
import UserTable from "@/pages/admin/users"
import CreateUser from "@/pages/admin/users/create"
import UpdateUser from "@/pages/admin/users/update"
import AdmissionInfo from "@/pages/admission"
import MajorCodes from "@/pages/admission/major-codes"
import SubjectGroups from "@/pages/admission/subject-group"
import Profile from "@/pages/profile"
import Ranking from "@/pages/transcript"
import School from "@/pages/school"
import Signin from "@/pages/signin"
import Signup from "@/pages/signup"
import { Route, Routes } from "react-router-dom"
import HomeLayout from "../components/layout/HomeLayout"
import Home from "../pages/home"
import Missing from "../pages/missing"
import News from "../pages/news"
import { roles } from "./constants"
function App() {

  return (
    <Routes>
      <Route path="/school" element={<SchoolLayout />}>
        <Route path=":id" element={<School />} />
      </Route>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/news" element={<News />} />
        <Route path="/admission-info">
          <Route index element={<AdmissionInfo />} />
          <Route path="subject-groups" element={<SubjectGroups />} />
          <Route path="major-codes" element={<MajorCodes />} />
        </Route>
        <Route path="/transcript" element={<Ranking />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={[roles.ADMIN]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="admissions" >
            <Route index element={<AdmissionTable />} />
            <Route path="new" element={<CreateAdmissionPlan />} />
            <Route path="update/:id" element={<UpdateAdmissionPlan />} />
            <Route path=":id">
              <Route index element={<AdmissionDetails />} />

              <Route path="training-programs" >
                <Route index element={<AdmissionTrainingPrograms />} />
                <Route path="new" element={<CreateAdmissionTrainingPrograms />} />
                <Route path=":trainingProgramId" element={<UpdateAdmissionTraningPrograms />} />
              </Route>

              <Route path="majors" >
                <Route index element={<AdmissionMajors />} />
                <Route path="new" element={<CreateAdmissionMajor />} />
                <Route path=":admissionMajorId" element={<UpdateAdmissionMajor />} />
              </Route>
            </Route>
          </Route>

          <Route path="institutions" >
            <Route index element={<InstitutionTable />} />
            <Route path=":id" element={<UpdateInstitution />} />
            <Route path="new" element={<CreateInstitution />} />
          </Route>

          <Route path="high-schools">
            <Route index element={<HighschoolTable />} />
            <Route path=":id" element={<UpdateHighSchool />} />
            <Route path="new" element={<CreateHighSchool />} />
          </Route>

          <Route path="majors">
            <Route index element={<MajorTable />} />
            <Route path=":id" element={<UpdateMajor />} />
            <Route path="new" element={<CreateMajor />} />
          </Route>

          <Route path="departments">
            <Route index element={<DepartmentTable />} />
            <Route path=":id" element={<UpdateDepartment />} />
            <Route path="new" element={<CreateDepartment />} />
          </Route>

          <Route path="schools">
            <Route index element={<SchoolTable />} />
            <Route path=":id" element={<UpdateSchool />} />
            <Route path="new" element={<CreateSchool  />} />
          </Route>

          <Route path="users">
            <Route index element={<UserTable />} />
            <Route path=":id" element={<UpdateUser />} />
            <Route path="new" element={<CreateUser />} />
          </Route>
          
        </Route>
      </Route>
      <Route path="*" element={<Missing />} />
    </Routes>
  )
}

export default App
