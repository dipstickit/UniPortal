import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
const UniversityCard = () => {
  return (
    <Card className="hover:cursor-pointer hover:bg-slate-100 hover:border-slate-300 dark:hover:border-slate-700">
      <CardHeader>
        <CardTitle>FPT University</CardTitle>
        <CardDescription>Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh</CardDescription>
      </CardHeader>
      <CardContent>
        <img src="https://daihoc.fpt.edu.vn/wp-content/uploads/2022/02/HCM-scaled.jpeg" alt="" className="rounded" />
      </CardContent>
    </Card>
  )
}

export default UniversityCard