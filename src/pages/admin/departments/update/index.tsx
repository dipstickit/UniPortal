import { Heading } from '@/components/common/Heading'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from '@/components/ui/separator'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useAppDispatch } from '@/app/hooks'
import { useCreateDepartmentMutation, useGetDepartmentsQuery, useGetDepartmentQuery, useUpdateDepartmentMutation, useGetSchoolsQuery } from '@/app/services/majors'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from '@/components/ui/use-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'


const formSchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string(),
  schoolId: z.string()
})

const UpdateDepartment = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation()
  const department = useGetDepartmentQuery(id!).data
  const navigate = useNavigate()
  const schools = useGetSchoolsQuery({ all: true })?.data?.schools

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: department?.name,
      code: department?.code,
      description: department?.description,
    }
  })

  console.log(department)

  useEffect(() => {
      
  }, [department]);
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateDepartment({
      id,
      body: values
    }).then(() => {
      navigate('/admin/departments')
      toast({
        title: "Update successfully",
        description: (new Date()).toUTCString(),
      })
    })
  }
  return (
    <div className="flex flex-col py-4 gap-4">
      <Breadcrumbs
        parents={[
          {
            label: "Dashboard",
            url: "/admin"
          },
          {
            label: "Departments",
            url: "/admin/departments "
          },
        ]}
        currentPage="Create"
      />
      <div className="flex items-start justify-between">
        <Heading title='Update an department' description='Update a new department' />
      </div>
      <Separator />
      <div className='flex'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-1/2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Department Name" {...field} defaultValue={field.value} />
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678" {...field} defaultValue={field.value}/>
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description for the department" {...field} defaultValue={field.value}/>
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="schoolId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        schools?.map(item =>
                          <SelectItem value={item.id.toString()}>{item.name} ({item.code})</SelectItem>
                        )
                      }
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                    You can manage email addresses in your{" "}
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

    </div>
  )
}

export default UpdateDepartment
