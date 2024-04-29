import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectType = {
  title?: string
  options: string[],
  label?: string,
  defaultValue?: string | number
}

export function DropdownSelect({ title, label, options, defaultValue }: SelectType) {
  return (
    <Select>
      <SelectTrigger className="">
        <SelectValue placeholder={defaultValue || title} defaultValue={defaultValue && options[0]} />
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
  )
}