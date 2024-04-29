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
import { useCreateAdmissionMutation, useGetAdmissionDetailsQuery, useUpdateAdmissionMutation } from '@/app/services/admission'
import { useGetInstitutionsQuery } from '@/app/services/institution'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'


const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  year: z.coerce.number(),
  institutionId: z.string(),
})

const UpdateAdmissionPlan = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [updateAdmission] = useUpdateAdmissionMutation()
  const { data, isLoading } = useGetAdmissionDetailsQuery(id!)
  const getInstitution = useGetInstitutionsQuery({ all: true })
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      description: data?.description ,
      year: data?.year,
      institutionId: data?.institution.id.toString(),
    },

  })
  // const { register: formRegister, handleSubmit } = useForm();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateAdmission({
      id,
      body: values
    }).then(() => {
      navigate('/admin/admissions')
    })
  }

  useEffect(() => {
    
  }, [data]);
  return (
    <div className="flex flex-col py-4 gap-4">
      <Breadcrumbs
        parents={[
          {
            label: "Dashboard",
            url: "/admin"
          },
          {
            label: "Admission plans",
            url: "/admin/admissions "
          },
        ]}
        currentPage="Create"
      />
      <div className="flex items-start justify-between">
        <Heading title='Create an admission plan' description='Add a new admission plan' />
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
                    <Input placeholder="Đề án tuyển sinh..." {...field} defaultValue={field.value}/>
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
                    <Input placeholder="Mô tả..." {...field} defaultValue={field.value}/>
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
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input placeholder={`${(new Date).getFullYear()}`} {...field} defaultValue={field.value}/>
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
              name="institutionId"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Institutions</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an institution" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        getInstitution?.data?.institutions.map(item =>
                          <SelectItem value={item.id.toString()}>{item.name}</SelectItem>
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

export default UpdateAdmissionPlan
