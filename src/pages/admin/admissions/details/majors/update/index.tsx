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
import { useCreateAdmissionMajorMutation, useGetAdmissionDetailsQuery, useGetAdmissionTrainingProgramsQuery, useUpdateAdmissionMajorMutation } from '@/app/services/admission'
import { useGetMajorsQuery } from '@/app/services/majors'
import { Major } from '@/app/types'


const formSchema = z.object({
  name: z.string(),
  quota: z.coerce.number(),
  description: z.string(),
  majorId: z.string(),
  admissionTrainingProgramId: z.string(),
})

const UpdateAdmissionMajor = () => {
  const dispatch = useAppDispatch()
  const { id, admissionMajorId } = useParams()
  const [options, setOptions] = useState<Major[]>([]);
  const [page, setPage] = useState(1);
  const traningPrograms = useGetAdmissionTrainingProgramsQuery({ id })
  const [updateAdmissionMajor] = useUpdateAdmissionMajorMutation()
  const admissionDetails = useGetAdmissionDetailsQuery(id!)
  const majors = useGetMajorsQuery({ page, search: '', sort: 'ASC', all: true })

  const navigate = useNavigate()

  const currentMajor = admissionDetails.data?.admissionMajors.find(item => item.id.toString() === admissionMajorId)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateAdmissionMajor({
      admissionId: id,
      admissionMajorId,
      body: values,
    }).then(() => {
      navigate(`/admin/admissions/${id}/majors`)
    }).catch(error => console.log(error))
  }
  console.log(currentMajor)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentMajor?.name,
      quota: currentMajor?.quota,
      description: currentMajor?.description,
      majorId: currentMajor?.major.id.toString(),
      admissionTrainingProgramId: currentMajor?.admissionTrainingProgram.id.toString()
    }
  })

  useEffect(() => {

  }, [currentMajor]);
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
            label: admissionDetails.data?.name || "",
            url: `/admin/admissions/${admissionDetails.data?.id}`
          },
          {
            label: "Majors",
            url: `/admin/admissions/${admissionDetails.data?.id}/majors`
          }
        ]}
        currentPage={"Update"}
      />
      <div className="flex items-start justify-between">
        <Heading title='Update admission major' description='Edit a admisison major' />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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

export default UpdateAdmissionMajor
