import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import Pagination from "@/components/common/Pagination";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetDepartmentsQuery, useGetMajorsQuery } from "@/app/services/majors";
import { debounce } from "lodash";
import SearchBar from "@/components/common/SearchBar";
import OrderButton from "@/components/common/OrderToggle";
import Breadcrumbs from "@/components/ui/breadcrumbs";


export const MajorCodes = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [asc, setAsc] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading } = useGetMajorsQuery({ page: page, sort: asc ? 'ASC' : 'DESC', search: searchTerm })
  console.log(data)
  const majors = data?.majors || []
  const toggleOrder = () => {
    setAsc(prevState => !prevState)
  }
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const debouncedSearch = debounce((debouncedSearchTerm: string) => {
    setSearchTerm(debouncedSearchTerm);
    setPage(1)
  }, 1000);
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    setTotalPage(data?.totalPages || 1)
  }, [data]);

  console.log(majors)
  const navigate = useNavigate();
  return (
    <div className="flex flex-col py-4 gap-4">
      <Breadcrumbs
        parents={[
          {
            label: "Thông tin tuyển sinh",
            url: "/admission-info"
          },
        ]}
        currentPage="Danh mục toàn bộ mã ngành tương ứng với các ngành"
      />
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold">Danh mục toàn bộ mã ngành tương ứng với các ngành</h1>
      </div>
      <Separator />
      <div className='flex gap-2 items-center w-1/2'>
        <SearchBar placeholder='Tìm kiếm chuyên ngành...' searchTerm={searchTerm} handleChange={handleSearch} />
        <OrderButton asc={asc} toggleOrder={toggleOrder} />
      </div>
      <DataTable searchKey="name" columns={columns} data={majors} loading={isLoading} showSelected={false}/>
      <Pagination count={totalPage} page={page} handleChange={handlePageChange} />
    </div>
  );
};

export default MajorCodes