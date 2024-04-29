import { useGetHighschoolsQuery } from "@/app/services/highschool";
import OrderButton from "@/components/common/OrderToggle";
import Pagination from "@/components/common/Pagination";
import SearchBar from "@/components/common/SearchBar";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { debounce } from "lodash";
import { Plus } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns } from "./columns";
import Breadcrumbs from "@/components/ui/breadcrumbs";


export const HighschoolTable = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [asc, setAsc] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading } = useGetHighschoolsQuery({ page: page, sort: asc ? 'ASC' : 'DESC', search: searchTerm, all: false })

  const highSchools = data?.highSchools || []
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

  const navigate = useNavigate();
  return (
    <div className="flex flex-col py-4 gap-4">
      <Breadcrumbs
        parents={[
          {
            label: "Dashboard",
            url: "/admin"
          },
        ]}
        currentPage="High Schools"
      />
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold">Manage highschools</h1>
        <Button
          className="text-xs md:text-sm"
          onClick={() => navigate(`/admin/high-schools/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div className='flex gap-2 items-center w-1/2'>
        <SearchBar placeholder='Search highschools...' searchTerm={searchTerm} handleChange={handleSearch} />
        <OrderButton asc={asc} toggleOrder={toggleOrder} />
      </div>
      <DataTable searchKey="name" columns={columns} data={highSchools} loading={isLoading} />
      <Pagination count={totalPage} page={page} handleChange={handlePageChange} />
    </div>
  );
};

export default HighschoolTable