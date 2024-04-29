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
import { useGetSchoolQuery, useGetSchoolsQuery, useUpdateSchoolMutation } from '@/app/services/majors'
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
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const formSchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string(),
})

const UpdateSchool = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [updateSchool, { isLoading }] = useUpdateSchoolMutation()
  const school = useGetSchoolQuery(id!).data
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: school?.name,
      code: school?.code,
      description: school?.description,
    }
  })

  console.log(school)

  useEffect(() => {

  }, [school]);
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateSchool({
      id,
      body: values
    }).then(() => {
      navigate('/admin/schools')
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
            label: "Schools",
            url: "/admin/schools "
          },
        ]}
        currentPage="Create"
      />
      <div className="flex items-start justify-between">
        <Heading title='Update an school' description='Update a new school' />
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
                    <Input placeholder="School Name" {...field} defaultValue={field.value} />
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
                    <Input placeholder="Description for the school" {...field} defaultValue={field.value}/>
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
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

export default UpdateSchool
