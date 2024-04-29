import { useDeleteAdmissionMajorMethodMutation } from "@/app/services/admission";
import { AdmissionMajorMethods } from "@/app/types";
import { AlertModal } from "@/components/common/AlertModel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface CellActionProps {
  data: AdmissionMajorMethods,
  hanldeUpdatingMethod?: React.MouseEventHandler<HTMLDivElement>
}

export const CellActionMethod: React.FC<CellActionProps> = ({ data, hanldeUpdatingMethod }) => {
  console.log(data)
  const { id } = useParams()
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteAdmissionMajorMethod, { isLoading }] = useDeleteAdmissionMajorMethodMutation()
  const onConfirm = async () => {
    await deleteAdmissionMajorMethod(data?.id)
      .then(() => {
        toast({
          title: "Chosen item was deleted successfully",
          description: (new Date()).toUTCString(),
        })
        setOpen(false)
      })
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={hanldeUpdatingMethod}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};