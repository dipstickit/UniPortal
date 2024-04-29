import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation-tabs";
import { Bookmark, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  useGetAdmissionDetailsQuery,
  useGetAdmissionsQuery,
} from "@/app/services/admission";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../admin/admissions/columns";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DoubleArrowRightIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";
import { useGetInstitutionQuery } from "@/app/services/institution";
import {
  institutionBanner,
  institutionFullIntroductions,
} from "@/data/placeholder";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardContent } from "@mui/material";
import SearchBar from "@/components/common/SearchBar";

const School = () => {
  //   const schoolIntroduction = `Chính thức thành lập ngày 8/9/2006 theo Quyết định của Thủ tướng Chính phủ, Trường Đại học FPT trở thành trường đại học đầu tiên của Việt Nam do một doanh nghiệp đứng ra thành lập với 100% vốn đầu tư từ Tập đoàn FPT.
  // Sự khác biệt của Trường Đại học FPT so với các trường đại học khác là đào tạo theo hình thức liên kết chặt chẽ với các doanh nghiệp, gắn đào tạo với thực tiễn, với nghiên cứu – triển khai và các công nghệ hiện đại nhất. Triết lý và phương pháp giáo dục hiện đại; Đào tạo con người toàn diện, hài hòa; Chương trình luôn được cập nhật và tuân thủ các chuẩn công nghệ quốc tế; Đặc biệt chú trọng kỹ năng ngoại ngữ; Tăng cường đào tạo quy trình tổ chức sản xuất, kỹ năng làm việc theo nhóm và các kỹ năng cá nhân khác là những điểm sẽ đảm bảo cho sinh viên tốt nghiệp có những cơ hội việc làm tốt nhất sau khi ra trường.
  // Trường hiện đang đào tạo các nhóm ngành CNTT, Kinh tế, Ngôn ngữ, Mỹ thuật ứng dụng.
  // Tất cả sinh viên Đại học FPT đều phải trải qua 1 năm hoàn thiện tiếng Anh, để có thể theo học chương trình chính khoá được đào tạo bằng tiếng Anh. Trong một năm đầu tiên học tiếng Anh, sinh viên được gửi sang các trường đại học ở các nước nói tiếng Anh (trong vòng 2 tháng) để thật sự lưu loát ngôn ngữ bắt buộc cho học tập và làm việc sau này.
  // Sau 5 học kỳ đầu tiên, với tiếng Anh và các kỹ năng cơ bản của ngành học, sinh viên được gửi vào làm thực tập sinh trong các công ty thành viên của tập đoàn FPT trong vòng 4 đến 8 tháng. Tại đây sinh viên được huấn luyện thực tế về nghề nghiệp tương lai, tham gia vào các dự án thật (real project) và có thể được trả lương. Đó là giai đoạn On-the-Job-Training (OJT) đặc thù của trường đại học FPT. Một số ngành như tiếng Nhật, Quản trị Khách sạn, sinh viên đi OJT tại Nhật Bản, tại Malaysia,…
  // Tỉ lệ việc làm của trường cũng đạt được con số ấn tượng. 96% sinh viên Đại học FPT có việc làm sau khi tốt nghiệp với mức lương bình quân khoảng 8,3 triệu đồng/người/tháng, 100% sinh viên có cơ hội làm việc ở FPT sau khi tốt nghiệp; 19% cựu sinh viên làm việc tại nước ngoài (số liệu năm 2017).`;

  const majors = [
    {
      id: 106,
      name: "Kinh tế",
      code: "7310101",
      description: null,
    },
    {
      id: 86,
      name: "Ngôn ngữ Anh",
      code: "7220201",
      description: null,
    },
    {
      id: 88,
      name: "Ngôn ngữ Pháp",
      code: "7220203",
      description: null,
    },
    {
      id: 89,
      name: "Ngôn ngữ Trung Quốc",
      code: "7220204",
      description: null,
    },
    {
      id: 90,
      name: "Ngôn ngữ Đức",
      code: "7220205",
      description: null,
    },
    {
      id: 94,
      name: "Ngôn ngữ Nhật",
      code: "7220209",
      description: null,
    },
    {
      id: 95,
      name: "Ngôn ngữ Hàn Quốc",
      code: "7220210",
      description: null,
    },
    {
      id: 145,
      name: "Marketing",
      code: "7340115",
      description: null,
    },
    {
      id: 188,
      name: "Khoa học dữ liệu",
      code: "7460108",
      description: "Có hiệu lực áp dụng từ ngày 22/7/2022. Bổ sung ngành mới.",
    },
    {
      id: 193,
      name: "Khoa học máy tính",
      code: "7480101",
      description: null,
    },
    {
      id: 195,
      name: "Kỹ thuật phần mềm",
      code: "7480103",
      description: null,
    },
    {
      id: 196,
      name: "Hệ thống thông tin",
      code: "7480104",
      description: null,
    },
    {
      id: 197,
      name: "Kỹ thuật máy tính",
      code: "7480106",
      description: null,
    },
    {
      id: 198,
      name: "Trí tuệ nhân tạo",
      code: "7480107",
      description: "Có hiệu lực áp dụng từ ngày 22/7/2022. Bổ sung ngành mới.",
    },
    {
      id: 200,
      name: "Công nghệ thông tin",
      code: "7480201",
      description: null,
    },
    {
      id: 201,
      name: "An toàn thông tin",
      code: "7480202",
      description: null,
    },
    {
      id: 214,
      name: "Công nghệ kỹ thuật điện, điện tử",
      code: "7510301",
      description: null,
    },
    {
      id: 215,
      name: "Công nghệ kỹ thuật điện tử - viễn thông",
      code: "7510302",
      description: null,
    },
  ];

  // const [page, setPage] = useState(1);
  // const [totalPage, setTotalPage] = useState<number>(1);
  // const [asc, setAsc] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const [display, setDisplay] = useState<
    undefined | "admission-details" | "training-programs" | "majors"
  >();
  const { id } = useParams();
  const listAdmission = useGetAdmissionsQuery({
    page: 1,
    search: "",
    institutionId: id,
  });
  const isAdmissionPlans = listAdmission?.data?.admissionPlans;
  const idd = isAdmissionPlans?.length ? isAdmissionPlans[0].id : "";
  const institution = useGetInstitutionQuery(id!);
  const { data, isLoading } = useGetAdmissionDetailsQuery(idd?.toString()!);
  console.log(isAdmissionPlans);
  console.log(idd);
  console.log(listAdmission);

  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchInputChange = (e: any) => {
    setSearchKeyword(e.target.value);
  };
  const filteredAdmissionMajors = data?.admissionMajors.filter((major) =>
    major.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  return (
    <section className="border rounded overflow-hidden my-2">
      <img
        src={
          institutionBanner[
            institution.data?.code as keyof typeof institutionBanner
          ]
        }
        className="w-full h-[10rem] object-cover"
      />
      <div className="flex justify-between h-[10rem]">
        <div className="p-4 flex gap-4 ">
          <img
            src={`${institution.data?.avatarLink}`}
            alt=""
            className="rounded w-32 h-32 border-2 object-contain"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold pl-1">
              {institution.data?.name}
            </h2>
            <div className="text-black/70 text-xl font-semibold pl-1">
              Mã: <span className="">{institution.data?.code}</span>
            </div>
            {/* <button className="flex items-center text-lg gap-1 group text-gray-500 pt-2">
              <Bookmark
                size={24}
                className="group-hover:fill-sky-600 text-accent"
              />
              <span className="group-hover:text-accent group-hover:font-semibold">
                Add to My List
              </span>
            </button> */}
          </div>
        </div>
      </div>
      <div>
        <Tabs defaultValue="details" className="pb-4">
          <TabsList className="flex gap-2">
            <TabsTrigger value="details">Thông tin chi tiết</TabsTrigger>
            <TabsTrigger value="programs">Chương trình học</TabsTrigger>
            <TabsTrigger value="methods">Đề án tuyển sinh</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Accordion
              type="multiple"
              defaultValue={["introduction", "contact"]}
            >
              <AccordionItem value="introduction">
                <AccordionTrigger className="text-lg">Mô tả</AccordionTrigger>
                <AccordionContent className="">
                  <div className="whitespace-pre-wrap text-base">
                    {
                      institutionFullIntroductions[
                        institution.data
                          ?.code as keyof typeof institutionFullIntroductions
                      ]
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="contact">
                <AccordionTrigger className="text-lg">Liên hệ</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-base">
                  <div>
                    <p>
                      SĐT:{" "}
                      <span className="font-semibold">
                        {institution.data?.phones
                          .map((phone) => phone.value)
                          .join(", ")}
                      </span>
                    </p>
                    <p>
                      Email:{" "}
                      <span className="font-semibold">
                        {institution.data?.emails
                          .map((email) => email.value)
                          .join(", ")}
                      </span>
                    </p>
                    <p>
                      Địa chỉ:{" "}
                      <span className="font-semibold">
                        {institution.data?.addresses.map((address, index) => (
                          <span key={index}>
                            {address.houseNumber}, {address.streetName},{" "}
                            {address.ward}, {address.district},{" "}
                            {address.cityProvince}
                          </span>
                        ))}
                      </span>
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="programs">
            <Table>
              <TableHeader>
                <TableRow className="font-medium text-lg">
                  <TableHead>Mã</TableHead>
                  <TableHead>Tên ngành</TableHead>
                  <TableHead>Mô tả</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {majors.map((major) => (
                  <TableRow key={major.id}>
                    <TableCell className="font-medium">{major.code}</TableCell>
                    <TableCell className="font-normal">{major.name}</TableCell>
                    <TableCell className="font-normal">
                      {major.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="methods">
            <div>
              {display === "training-programs" && (
                <div className="flex flex-col py-4 gap-4">
                  <div onClick={() => setDisplay("admission-details")}>
                    <Breadcrumbs
                      parents={[
                        {
                          label: "Đề án tuyển sinh",
                          url: `/school/${id}`,
                        },
                        {
                          label: data?.name || "",
                          url: `/school/${id}`,
                        },
                      ]}
                      currentPage={"Chương trình đào tạo"}
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <h1 className="text-3xl font-bold">{data?.name || ""}</h1>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-start justify-between">
                      <h1 className="text-2xl font-semibold">
                        Chương trình đào tạo
                      </h1>
                    </div>
                    <div>
                      <Table>
                        <TableHeader>
                          <TableRow className="font-medium text-lg">
                            <TableHead>No.</TableHead>
                            <TableHead>Chương trình đào tạo</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data?.admissionTrainingPrograms.map((item: any) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-normal">
                                {item.id}
                              </TableCell>
                              <TableCell className="font-normal">
                                {item.name}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
              {display === "majors" && (
                <div className="flex flex-col py-4 gap-4">
                  <div onClick={() => setDisplay("admission-details")}>
                    <Breadcrumbs
                      parents={[
                        {
                          label: "Đề án tuyển sinh",
                          url: `/school/${id}`,
                        },
                        {
                          label: data?.name || "",
                          url: `/school/${id}`,
                        },
                      ]}
                      currentPage={"Ngành tuyển sinh"}
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <h1 className="text-3xl font-bold">{data?.name || ""}</h1>
                  </div>
                  <Separator />
                  <SearchBar
                    placeholder="Tìm ngành..."
                    searchTerm={searchKeyword}
                    handleChange={handleSearchInputChange}
                  />
                  <div className="flex flex-col gap-4">
                    <Accordion type="multiple">
                      {filteredAdmissionMajors?.map((major, majorIndex) => (
                        <AccordionItem
                          key={majorIndex}
                          value={`major-${majorIndex}`}
                          className="mb-2"
                        >
                          <AccordionTrigger className="text-lg p-3 bg-slate-100 border-black cursor-pointer">
                            {major.name || `Ngành tuyển sinh ${majorIndex + 1}`}
                          </AccordionTrigger>
                          <AccordionContent className="pl-5 pt-2 pb-2 border-black">
                            <div className="text-base">
                              <p>
                                Mô tả:{" "}
                                <span className="font-semibold">
                                  {major.description || "Hiện không có mô tả"}
                                </span>
                              </p>
                              <p>
                                Chỉ tiêu:{" "}
                                <span className="font-semibold">
                                  {major.quota}
                                </span>
                              </p>
                              {major.major ? (
                                <>
                                  <p>
                                    Chuyên ngành:{" "}
                                    <span className="font-semibold">
                                      {major.major.name}
                                    </span>
                                  </p>
                                  <p>
                                    Mã:{" "}
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
                                    Chương trình đào tạo:{" "}
                                    <span className="font-semibold">
                                      {major.admissionTrainingProgram.name}
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <p></p>
                              )}
                              <Accordion type="multiple" className="mt-2 pl-5">
                                {major?.admissionMajorMethods.map(
                                  (method, methodIndex) => (
                                    <AccordionItem
                                      key={methodIndex}
                                      value={`method-${majorIndex}-${methodIndex}`}
                                      className="mb-1"
                                    >
                                      <AccordionTrigger className="text-base px-3 py-1 bg-slate-200 border-black cursor-pointer">
                                        {method.name ||
                                          `Phương thức tuyển sinh ${
                                            methodIndex + 1
                                          }`}
                                      </AccordionTrigger>
                                      <AccordionContent className="pl-5 pt-1 pb-1">
                                        <div className="whitespace-pre-wrap text-base">
                                          <p>
                                            Tên:{" "}
                                            <span className="font-semibold">
                                              {method.admissionMethod.name}
                                            </span>
                                          </p>
                                          <p>
                                            Mã:{" "}
                                            <span className="font-semibold">
                                              {method.admissionMethod.code}
                                            </span>
                                          </p>
                                          <p>
                                            Tổ hợp môn:{" "}
                                            {method.subjectGroups.length > 0 ? (
                                              method.subjectGroups.map(
                                                (
                                                  subject: any,
                                                  index: number
                                                ) => (
                                                  <span
                                                    key={index}
                                                    style={{
                                                      marginLeft: "5px",
                                                    }}
                                                  >
                                                    <span className="inline-block px-2 py-1 rounded-md bg-slate-100 font-semibold">
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
                                  )
                                )}
                              </Accordion>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              )}
              {display == "admission-details" && (
                <div className="flex flex-col py-4 gap-4">
                  <div onClick={() => setDisplay(undefined)}>
                    <Breadcrumbs
                      parents={[
                        {
                          label: "Đề án tuyển sinh",
                          url: `/school/${id}`,
                        },
                      ]}
                      currentPage={data?.name || ""}
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <h1 className="text-3xl font-bold">{data?.name || ""}</h1>
                  </div>
                  <Separator />

                  <div className="flex flex-col gap-4">
                    <div className="">
                      <Button
                        variant="link"
                        className="text-lg gap-2 flex items-center"
                        onClick={() => setDisplay("training-programs")}
                      >
                        <DoubleArrowRightIcon className="w-5 h-5" />
                        <div>
                          Chương trình đào tạo (
                          {data?.admissionTrainingPrograms.length})
                        </div>
                      </Button>
                      <Button
                        variant="link"
                        className="text-lg gap-2 flex items-center mt-4"
                        onClick={() => setDisplay("majors")}
                      >
                        <DoubleArrowRightIcon className="w-5 h-5" />
                        <div>
                          Chi tiết đề án ({data?.admissionMajors.length})
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {!display && (
                <div className="flex flex-col py-4 gap-4">
                  <div onClick={() => setDisplay(undefined)}>
                    <Breadcrumbs
                      parents={[]}
                      currentPage={"Đề án tuyển sinh"}
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    {isAdmissionPlans?.map((item, index) => (
                      <Card
                        onClick={() => setDisplay("admission-details")}
                        className="group text-lg font-semibold hover:shadow-md rounded-lg overflow-hidden cursor-pointer"
                      >
                        <CardHeader>
                          <CardTitle className="group-hover:text-accent">
                            {item.name}
                          </CardTitle>
                          <CardDescription className="text-gray-500">
                            {item.year}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default School;
