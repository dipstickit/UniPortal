import { Heading } from '@/components/common/Heading'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import { z } from "zod"
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
import { useGetAccountQuery, useRegisterMutation, useUpdateAccountMutation } from '@/app/services/users'
import { useAppDispatch } from '@/app/hooks'
import { roles, status } from '@/app/constants'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { useGetAdmissionDetailsQuery, useGetAdmissionTrainingProgramsQuery, useGetTrainingProgramsQuery, useUpdateAdmissionTrainingProgramMutation } from '@/app/services/admission'
import { toast } from '@/components/ui/use-toast'


const UpdateAdmissionTraningPrograms = () => {
  const { id, trainingProgramId } = useParams()
  const admissionDetails = useGetAdmissionDetailsQuery(id!)
  const traningPrograms = useGetTrainingProgramsQuery({})
  const [updateAdmisisonTrainingProgram] = useUpdateAdmissionTrainingProgramMutation()
  const navigate = useNavigate()

  const currentTraningProgram = admissionDetails.data?.admissionTrainingPrograms.find(item => item.id.toString() === trainingProgramId)

  const formSchema = z.object({
    name: z.string(),
    trainingProgramId: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentTraningProgram?.name,
      trainingProgramId: currentTraningProgram?.trainingProgram.id.toString()
    }
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateAdmisisonTrainingProgram({
      admissionId: id,
      trainingProgramId,
      body: values
    }).then((response) => {
      navigate(`/admin/admissions/${id}/training-programs`)
      toast({
        title: "Chosen item was updated successfully",
        description: (new Date()).toUTCString(),
      })
    }).catch(error => {
      console.log(error)
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
            label: "Admission Plans",
            url: "/admin/admissions"
          },
          {
            label: admissionDetails.data?.name || "",
            url: `/admin/admissions/${admissionDetails?.data?.id}`
          },
          {
            label: "Traning Programs",
            url: `/admin/admissions/${admissionDetails?.data?.id}/training-programs`
          }
        ]}
        currentPage={"Update"}
      />
      <div className="flex items-start justify-between">
        <Heading title='Update training program' description='Edit a training program' />
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
                    <Input placeholder="Training program name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trainingProgramId"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Training programs</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a traning program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        traningPrograms?.data?.trainingPrograms.map(item =>
                          <SelectItem value={item.id.toString()} key={item.id}>{item.name}</SelectItem>
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

export default UpdateAdmissionTraningPrograms
