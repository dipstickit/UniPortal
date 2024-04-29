import { useGetInstitutionsQuery } from "@/app/services/institution";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  const institution = useGetInstitutionsQuery({})
  return (
    <div className="space-y-8 h-80 overflow-auto px-2">
      {
        institution.data?.institutions.map(item =>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={item.avatarLink} alt="Avatar" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.code}</p>
            </div>
          </div>
        )}
    </div>
  )
}