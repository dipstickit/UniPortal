import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
// import AdmissionMajors from "./admission-majors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAdmissionDetailsQuery } from "@/app/services/admission";
import { DataTableSkeleton } from "@/components/common/Skeleton";
import { CellAction } from "./cell-action";
import { AdmissionTrainingPrograms } from "@/app/types";

const AdmissionTrainingPrograms = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetAdmissionDetailsQuery(id!)
  const navigate = useNavigate()
  return (
    <div className="flex flex-col py-4 gap-4">
      <Breadcrumbs
        parents={[
          {
            label: "Dashboard",
            url: "/admin"
          },
          {
            label: "Admission Plans",
            url: "/admin/admissions"
          },
          {
            label: data?.name || "",
            url: `/admin/admissions/${data?.id}`
          }
        ]}
        currentPage={"Traning programs"}
      />
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold">{data?.name || ""}</h1>
      </div>
      <Separator />
      <div>
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-2xl font-semibold">Training programs</h1>
          <Button
            className="text-xs md:text-sm"
            onClick={() => navigate(`new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <div>
          {
            isLoading ?
              <div className="pt-4"><DataTableSkeleton /></div>
              : <Table>
                <TableHeader>
                  <TableRow className="font-medium text-lg">
                    <TableHead>No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.admissionTrainingPrograms.map((item: AdmissionTrainingPrograms) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-normal">{item.id}</TableCell>
                      <TableCell className="font-normal">{item.name}</TableCell>
                      <TableCell className="font-normal">{item.trainingProgram.name}</TableCell>
                      <CellAction data={item}/>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          }
        </div>
      </div>
    </div>
  )
}

export default AdmissionTrainingPrograms