import { ColumnDef, RowSelection } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { AdmissionPlans, Institution } from "@/app/types";
import { Link } from "react-router-dom";
import LinkText from "@/components/common/LinkText";

export const columns: ColumnDef<AdmissionPlans>[] = [
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
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <LinkText navigateTo={`${row.original.id}`}>{row.original.name}</LinkText>
    ),
  },
  {
    accessorKey: "year",
    header: "YEAR",
  },
  {
    accessorKey: "insitution",
    header: "INSTITUTION",
    cell: ({ row }) => <div>{row.original.institution.name}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
