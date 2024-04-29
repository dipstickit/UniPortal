import { Checkbox } from "@/components/ui/checkbox"

interface CheckBoxLabelType {
  label: string
}
export function CheckboxLabel({ label }: CheckBoxLabelType) {
  const id = `checkbox-${label}-id`
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}