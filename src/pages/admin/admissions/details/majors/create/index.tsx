import { Heading } from '@/components/common/Heading'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import { number, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DropdownSelect } from '@/components/common/DropdownSelect'
import { register } from 'module'
import { useCreateInstitutionMutation } from '@/app/services/institution'
import { useAppDispatch } from '@/app/hooks'
import { roles } from '@/app/constants'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { useCreateAdmissionMajorMutation, useGetAdmissionDetailsQuery, useGetAdmissionTrainingProgramsQuery } from '@/app/services/admission'
import { useGetMajorsQuery } from '@/app/services/majors'
import { Major } from '@/app/types'
import { toast } from '@/components/ui/use-toast'


const formSchema = z.object({
  name: z.string(),
  quota: z.coerce.number(),
  description: z.string(),
  majorId: z.string(),
  admissionTrainingProgramId: z.string(),
})

const CreateAdmissionMajor = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [options, setOptions] = useState<Major[]>([]);
  const [page, setPage] = useState(1);
  const traningPrograms = useGetAdmissionTrainingProgramsQuery({ id })
  const [createAdmissionMajor] = useCreateAdmissionMajorMutation()
  const majors = useGetMajorsQuery({ page, search: '', sort: 'ASC', all: true })
  console.log(majors.data)
  console.log(majors.currentData)
  console.log(options)
  const navigate = useNavigate()

  const { data, isLoading } = useGetAdmissionDetailsQuery(id!)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createAdmissionMajor({
      id,
      body: values,
    }).then(() => {
      navigate(`/admin/admissions/${data?.id}/majors`)
      toast({
        title: "Create successfully",
        description: (new Date()).toUTCString(),
      })
    }).catch(error => console.log(error))
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })


  // useEffect(() => {
  //   const newOptions = majors?.data?.majors ?? []
  //   setOptions(options => [...options, ...newOptions])
  //   // if (page <= 3) {
  //   //   setPage(prevPage => prevPage + 1)
  //   // }
  // }, [page, majors.data]);
  return (
    <div className="flex flex-col py-4 gap-4">
      <Breadcrumbs
        parents={[
          {
            label: "Dashboard",
            url: "/admin"
          },
          {
            label: "Admission Plans",
            url: "/admin/admissions"
          },
          {
            label: data?.name || "",
            url: `/admin/admissions/${data?.id}`
          },
          {
            label: "Majors",
            url: `/admin/admissions/${data?.id}/majors`
          }
        ]}
        currentPage={"Create"}
      />
      <div className="flex items-start justify-between">
        <Heading title='Create admission major' description='Add a new admisison major' />
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
                    <Input placeholder="Major name" {...field} />
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
                    <Input placeholder="Description" {...field} />
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
              name="quota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quota</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder="Quota" {...field} />
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
              name="admissionTrainingProgramId"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Training Programs</FormLabel>
                  <Select onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a traning program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        traningPrograms?.data?.admissionTrainingPrograms.map(item =>
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

            <FormField
              control={form.control}
              name="majorId"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Major</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a traning program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        majors?.data?.majors.map(item =>
                          <SelectItem value={item.id.toString()}>{item.name}</SelectItem>
                        )
                        // options.map((item, index) =>
                        //   <SelectItem key={index} value={item.id.toString()}>{item.name}</SelectItem>
                        // )
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

export default CreateAdmissionMajor
