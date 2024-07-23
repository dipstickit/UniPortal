import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { Institution } from "@/app/types";

export const columns: ColumnDef<Institution>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "avatarLink",
    header: "IMAGE",
    cell: ({ row }) => (
      <img
        src={row.original.avatarLink}
        className="w-12 h-12"
        alt={row.original.name}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "code",
    header: "CODE",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
