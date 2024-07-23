import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { Major } from "@/app/types";

export const columns: ColumnDef<Major>[] = [
  {
    accessorKey: "",
    header: "NO.",
    cell: ({ row }) => <div className="pl-2">{row.index + 1}</div>,
  },
  {
    accessorKey: "code",
    header: "MÃ NGÀNH",
  },
  {
    accessorKey: "name",
    header: "TÊN",
  },
  {
    accessorKey: "department",
    header: "KHỐI NGÀNH",
    cell: ({ row }) => <div>{row.original.department.name}</div>,
  },
];
