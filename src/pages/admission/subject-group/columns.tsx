import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { Major, SubjectGroup } from "@/app/types";

export const columns: ColumnDef<SubjectGroup>[] = [
  {
    accessorKey: "",
    header: "NO.",
    cell: ({ row }) => <div className="pl-2">{row.index + 1}</div>,
  },
  {
    accessorKey: "code",
    header: "MÃ TỔ HỢP",
  },
  {
    accessorKey: "subjects",
    header: "MÔN HỌC",
    cell: ({ row }) => (
      <div className="">{row.original.subjects.join(", ")}</div>
    ),
  },
];
