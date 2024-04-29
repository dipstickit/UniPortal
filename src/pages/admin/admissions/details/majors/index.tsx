import { useGetAdmissionDetailsQuery, useGetAdmissionMajorsQuery } from "@/app/services/admission";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import { CellAction } from "./cell-action";
import { CellActionMethod } from "./methods/cell-action";
import CreateAdmissionMajorMethod from "./methods/create";
import { ChangeEvent, useState } from "react";
import UpdateAdmissionMajorMethod from "./methods/update";
import SearchBar from "@/components/common/SearchBar";
import { debounce } from "lodash";
import Pagination from "@/components/common/Pagination";

const AdmissionMajors = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAdmissionDetailsQuery(id!)
  const admissionMajorsData = useGetAdmissionMajorsQuery({ id: id, search: searchTerm, page })?.data
  const [showCreateMethodForm, setShowCreateMethodForm] = useState(false)
  const [updatingMethodId, setUpdatingMethodId] = useState<number>(-1)

  console.log(admissionMajorsData)

  const toggleCreate = () => {
    setShowCreateMethodForm(prevState => !prevState)
  }

  const handleUpdatingMethod = (id: number) => {
    setUpdatingMethodId(id)
  }
  const debouncedSearch = debounce((debouncedSearchTerm: string) => {
    setSearchTerm(debouncedSearchTerm);
    setPage(1)
  }, 1000);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
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
          },
          {
            label: data?.name || "",
            url: `/admin/admissions/${data?.id}`
          }
        ]}
        currentPage={"Admission majors"}
      />
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold">{data?.name || ""}</h1>
      </div>
      <Separator />
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold">Admission Majors</h1>
        <Button
          className="text-xs md:text-sm"
          onClick={() => navigate(`new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <div className="flex flex-col py-2 gap-4">
        <SearchBar placeholder='Search admission majors...' searchTerm={searchTerm} handleChange={handleSearch} />

        <div className="flex flex-col gap-4">
          <Accordion type="multiple">
            {admissionMajorsData?.admissionMajors?.map((major, majorIndex) => (
              <div className="flex gap-4">
                <AccordionItem
                  key={majorIndex}
                  value={`major-${majorIndex}`}
                  className="mb-2 w-full"
                >
                  <AccordionTrigger
                    className="text-lg p-3 border-black cursor-pointer"
                  >
                    {major.name || `Admission Major ${majorIndex + 1}`}
                  </AccordionTrigger>
                  <AccordionContent
                    className="pl-4 pt-2 pb-2 border-black"
                  >
                    <div className="text-base">
                      <p>
                        Description:{" "}
                        <span className="font-semibold">
                          {major.description || "No description"}
                        </span>
                      </p>
                      <p>
                        Quota:{" "}
                        <span className="font-semibold">
                          {major.quota}
                        </span>
                      </p>
                      {major.major ? (
                        <>
                          <p>
                            Major:{" "}
                            <span className="font-semibold">
                              {major.major.name}
                            </span>
                          </p>
                          <p>
                            Code:{" "}
                            <span className="font-semibold">
                              {major.major.code}
                            </span>
                          </p>
                        </>
                      ) : (
                        <p></p>
                      )}
                      {major.admissionTrainingProgram ? (
                        <>
                          <p>
                            Traning Program:{" "}
                            <span className="font-semibold">
                              {major.admissionTrainingProgram.name}
                            </span>
                          </p>
                        </>
                      ) : (
                        <p></p>
                      )}
                      <Accordion
                        type="multiple"
                        className="mt-2 pl-2"
                      >
                        {major?.admissionMajorMethods.map(
                          (method, methodIndex) => (
                            <div className="flex gap-2">
                              {
                                updatingMethodId == method.id
                                  ? <UpdateAdmissionMajorMethod
                                    data={data!}
                                    admissionMajorId={major.id}
                                    method={method}
                                    handleUpdatingMethod={() => handleUpdatingMethod(-1)} />
                                  : <>
                                    <AccordionItem
                                      key={methodIndex}
                                      value={`method-${majorIndex}-${methodIndex}`}
                                      className="mb-1 w-full"
                                    >
                                      <AccordionTrigger
                                        className="text-base px-2 py-1 bg-slate-50 border-black cursor-pointer"
                                      >
                                        {method.name ||
                                          `Admission Method ${methodIndex + 1}`}
                                      </AccordionTrigger>
                                      <AccordionContent
                                        className="pl-5 pt-1 pb-1"
                                      >
                                        <div className="whitespace-pre-wrap text-base">
                                          <p>
                                            Type:{" "}
                                            <span className="font-semibold">
                                              {method?.admissionMethod?.name}
                                            </span>
                                          </p>
                                          <p>
                                            Code:{" "}
                                            <span className="font-semibold">
                                              {method?.admissionMethod?.code}
                                            </span>
                                          </p>
                                          <p>
                                            Subjects:{" "}
                                            {method.subjectGroups?.length > 0 ? (
                                              method.subjectGroups.map(
                                                (
                                                  subject: any,
                                                  index: number
                                                ) => (
                                                  <span
                                                    key={index}
                                                    className="ml-1"
                                                  >
                                                    <span
                                                      className="inline-block px-2 py-1 rounded-md bg-slate-100 font-semibold"
                                                    >
                                                      {subject.code}
                                                    </span>
                                                  </span>
                                                )
                                              )
                                            ) : (
                                              <span>-</span>
                                            )}
                                          </p>
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                    <div><CellActionMethod data={method} hanldeUpdatingMethod={() => handleUpdatingMethod(method.id)} /></div>
                                  </>
                              }

                            </div>
                          )
                        )}
                        <div>
                          {showCreateMethodForm
                            ? <CreateAdmissionMajorMethod data={data!} toggleOpen={toggleCreate} admissionMajorId={major.id} />
                            : <Button
                              className="text-xs md:text-sm text-left"
                              variant='outline'
                              onClick={toggleCreate}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Add admission method
                            </Button>
                          }
                        </div>
                      </Accordion>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <div className="flex items-start mt-4">
                  <CellAction data={major} />
                </div>
              </div>
            ))}
          </Accordion>
        </div>
        <Pagination count={admissionMajorsData?.totalPages || 1} page={0} handleChange={handlePageChange} />
      </div>
    </div >
  )
}

export default AdmissionMajors