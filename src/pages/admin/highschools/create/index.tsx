import { Heading } from '@/components/common/Heading'
import { Separator } from '@/components/ui/separator'
import React, { useEffect } from 'react'
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
import { register } from 'module'
import { useCreateInstitutionMutation } from '@/app/services/institution'
import { useAppDispatch } from '@/app/hooks'
import { roles } from '@/app/constants'
import { Link, useNavigate } from 'react-router-dom'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { toast } from '@/components/ui/use-toast'
import { useCreateHighschoolMutation } from '@/app/services/highschool'
import { useGetCityProvincesQuery } from '@/app/services/address'


const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  cityProvinceId: z.string()
})

const CreateHighSchool = () => {
  const dispatch = useAppDispatch()
  const [createhighschool, { isLoading }] = useCreateHighschoolMutation()
  // const departments = useGetDepartmentsQuery({ all: true })?.data?.departments
  const cityProvince = useGetCityProvincesQuery({ all: true }).data?.cityProvinces
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  console.log(cityProvince)
  // const { register: formRegister, handleSubmit } = useForm();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createhighschool({
      body: values
    }).then(() => {
      navigate('/admin/high-schools')
      toast({
        title: "Create successfully",
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
            label: "Highschools",
            url: "/admin/highschools "
          },
        ]}
        currentPage="Create"
      />
      <div className="flex items-start justify-between">
        <Heading title='Create an highschool' description='Add a new highschool' />
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
                    <Input placeholder="HIghschool Name" {...field} />
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
                    <Input placeholder="Description for the highschool" {...field} />
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
              name="cityProvinceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City Province</FormLabel>
                  <Select onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        cityProvince?.map(item =>
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

export default CreateHighSchool
