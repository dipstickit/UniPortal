import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { ChangeEvent } from "react";


type SearchBarProps = {
  placeholder?: string,
  searchTerm?: string,
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
const SearchBar = ({ placeholder= "", searchTerm = "", handleChange }: SearchBarProps) => {
  return (
    <div className="flex w-full items-center gap-2 relative">
      <Search className="absolute left-2 text-slate-500" size={20} values={searchTerm} />
      <Input type="email" placeholder={placeholder} className="w-full pl-8 pr-4" onChange={handleChange} />
    </div>
  )
}

export default SearchBar
