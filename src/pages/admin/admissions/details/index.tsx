import { useGetAdmissionDetailsQuery } from "@/app/services/admission";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DoubleArrowRightIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import AdmissionMajors from "./admission-majors";

export const AdmissionDetails = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetAdmissionDetailsQuery(id!)
  const navigate = useNavigate()
  console.log(data)
  return (
    <div className="flex flex-col py-4 gap-4" >
      <Breadcrumbs
        parents={[
          {
            label: "Dashboard",
            url: "/admin"
          },
          {
            label: "Admission Plans",
            url: "/admin/admissions"
          }
        ]}
        currentPage={data?.name || ""}
      />
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold">{data?.name || ""}</h1>
      </div>
      <Separator />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-4 ">
            <img
              src={data?.institution.avatarLink}
              alt=""
              className="rounded w-20 h-20 border-2 object-contain"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold pl-1">{data?.institution.name}</h2>
              <div className="text-black/70 text-xl font-semibold pl-1">
                Code: <span className="">{data?.institution.code}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="font-semibold">Description:</span> {data?.description
            || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum sem ex. Etiam nisi ligula, cursus consequat eleifend vitae, sollicitudin et lorem. Nam dignissim augue feugiat orci hendrerit, quis facilisis elit convallis. Nulla pretium molestie metus in faucibus. Donec ornare dignissim mauris vitae ornare. Vestibulum tempor euismod dictum."
          }
        </div>
        <div className="">
          <Button variant='link' className="text-lg gap-2 flex items-center" onClick={() => navigate('training-programs')}>
            <DoubleArrowRightIcon className="w-5 h-5" />
            <div>Training programs ({data?.admissionTrainingPrograms.length})</div>
          </Button>
          <Button variant='link' className="text-lg gap-2 flex items-center mt-4" onClick={() => navigate('majors')}>
            <DoubleArrowRightIcon className="w-5 h-5" />
            <div>Details major admission ({data?.admissionMajors.length})</div>
          </Button>
        </div>
      </div>
    </div >
  );
};

export default AdmissionDetails