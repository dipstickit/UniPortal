import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SortByProps = {
  title?: string
  options: string[],
  label?: string,
}


const SortBy = ({ title, options, label}: SortByProps) => {
  return (
    <div className='max-w-36 w-full'>
      <Select>
        <SelectTrigger className="flex gap-1">
          <span className='text-slate-500'>{title || "Sort By"}: </span>
          <SelectValue defaultValue={options[0]} placeholder={options[0]} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map(item =>
              <SelectItem key={item} value={item} className="capitalize">{item}</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortBy