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
import { useCreateMajorMutation, useGetDepartmentsQuery, useGetMajorQuery, useUpdateMajorMutation } from '@/app/services/majors'
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
  departmentId: z.string()
})

const UpdateMajor = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [updateMajor, { isLoading }] = useUpdateMajorMutation()
  const departments = useGetDepartmentsQuery({ all: true })?.data?.departments
  const major = useGetMajorQuery(id!).data
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: major?.name,
      code: major?.code,
      description: major?.description,
      departmentId: major?.department?.id?.toString()
    }
  })

  console.log(major)

  useEffect(() => {

  }, [major]);
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateMajor({
      id,
      body: values
    }).then(() => {
      navigate('/admin/majors')
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
            label: "Majors",
            url: "/admin/majors "
          },
        ]}
        currentPage="Create"
      />
      <div className="flex items-start justify-between">
        <Heading title='Update an major' description='Update a new major' />
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
                    <Input placeholder="College Name" {...field} defaultValue={field.value} />
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
                    <Input placeholder="Description for the major" {...field} defaultValue={field.value}/>
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
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        departments?.map(item =>
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

export default UpdateMajor
